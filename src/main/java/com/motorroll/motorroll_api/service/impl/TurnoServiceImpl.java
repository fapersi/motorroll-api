package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.dto.turno.AgendaResponse;
import com.motorroll.motorroll_api.dto.turno.BancoParaProbarResponse;
import com.motorroll.motorroll_api.dto.turno.TurnoRequest;
import com.motorroll.motorroll_api.dto.turno.TurnoResponse;
import com.motorroll.motorroll_api.exception.OperacionNoPermitidaException;
import com.motorroll.motorroll_api.exception.RecursoDuplicadoException;
import com.motorroll.motorroll_api.exception.RecursoNoEncontradoException;
import com.motorroll.motorroll_api.exception.ReglaDeNegocioException;
import com.motorroll.motorroll_api.mapper.TurnoMapper;
import com.motorroll.motorroll_api.model.AgendaDeTurnos;
import com.motorroll.motorroll_api.model.CompatibilidadDeBancos;
import com.motorroll.motorroll_api.model.EstadoTurno;
import com.motorroll.motorroll_api.model.Producto;
import com.motorroll.motorroll_api.model.Turno;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.ProductoRepository;
import com.motorroll.motorroll_api.repository.TurnoRepository;
import com.motorroll.motorroll_api.service.TurnoService;
import com.motorroll.motorroll_api.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TurnoServiceImpl implements TurnoService {
    private final TurnoRepository turnoRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioService usuarioService;
    private final TurnoMapper turnoMapper;

    @Override
    @Transactional(readOnly = true)
    public List<BancoParaProbarResponse> listarBancos() {
        return productoRepository.listarBancosParaProbar().stream().map(turnoMapper::aBanco).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AgendaResponse verAgenda() {
        return AgendaResponse.builder()
                .horarios(AgendaDeTurnos.HORARIOS)
                .diasDeAnticipacion(AgendaDeTurnos.DIAS_DE_ANTICIPACION)
                .ocupados(turnoRepository.findByEstadoAndFechaAfter(EstadoTurno.CONFIRMADO, LocalDate.now())
                        .stream().map(turnoMapper::aOcupado).toList())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TurnoResponse> misTurnos(String username) {
        Usuario cliente = usuarioService.buscarEntidadPorUsername(username);

        return turnoRepository.findByClienteIdOrderByFechaDescHoraDesc(cliente.getId()).stream()
                .map(turnoMapper::aResponse)
                .toList();
    }

    @Override
    @Transactional
    public TurnoResponse reservar(String username, TurnoRequest request) {
        Usuario cliente = usuarioService.buscarEntidadPorUsername(username);
        Producto banco = productoRepository.findByIdAndActivoTrue(request.getBancoId())
                .orElseThrow(() -> new RecursoNoEncontradoException("el banco", request.getBancoId()));

        validarFechaYHora(request.getFecha(), request.getHora());
        if (banco.getFichaTecnica() == null || !CompatibilidadDeBancos.admite(banco, request.getVehiculo())) {
            throw new ReglaDeNegocioException("El banco " + banco.getNombre() + " no admite ese tipo de vehiculo");
        }
        if (turnoRepository.existsByBancoIdAndFechaAndHoraAndEstado(
                banco.getId(), request.getFecha(), request.getHora(), EstadoTurno.CONFIRMADO)) {
            throw new RecursoDuplicadoException("Ese horario ya esta reservado, elegi otro");
        }

        Turno turno = turnoRepository.save(Turno.builder()
                .cliente(cliente)
                .banco(banco)
                .fecha(request.getFecha())
                .hora(request.getHora())
                .vehiculo(request.getVehiculo())
                .modeloVehiculo(request.getModeloVehiculo().trim())
                .comentario(request.getComentario() != null ? request.getComentario().trim() : null)
                .estado(EstadoTurno.CONFIRMADO)
                .build());

        return turnoMapper.aResponse(turno);
    }

    @Override
    @Transactional
    public TurnoResponse cancelar(String username, Long id) {
        Usuario cliente = usuarioService.buscarEntidadPorUsername(username);
        Turno turno = turnoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("el turno", id));

        if (!turno.getCliente().getId().equals(cliente.getId())) {
            throw new OperacionNoPermitidaException("Solo podes cancelar tus propios turnos");
        }
        if (turno.getEstado() == EstadoTurno.CANCELADO) {
            throw new ReglaDeNegocioException("El turno ya estaba cancelado");
        }

        turno.setEstado(EstadoTurno.CANCELADO);
        return turnoMapper.aResponse(turnoRepository.save(turno));
    }

    private void validarFechaYHora(LocalDate fecha, String hora) {
        if (!AgendaDeTurnos.estaEnRango(fecha)) {
            throw new ReglaDeNegocioException("Podes reservar desde manana y hasta "
                    + AgendaDeTurnos.DIAS_DE_ANTICIPACION + " dias para adelante");
        }
        if (!AgendaDeTurnos.esDiaHabil(fecha)) {
            throw new ReglaDeNegocioException("El taller atiende de lunes a viernes");
        }
        if (!AgendaDeTurnos.HORARIOS.contains(hora)) {
            throw new ReglaDeNegocioException("Ese horario no existe. Horarios: " + AgendaDeTurnos.HORARIOS);
        }
    }
}
