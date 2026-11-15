package com.motorroll.motorroll_api.mapper;

import com.motorroll.motorroll_api.dto.turno.BancoParaProbarResponse;
import com.motorroll.motorroll_api.dto.turno.HorarioOcupadoResponse;
import com.motorroll.motorroll_api.dto.turno.TurnoResponse;
import com.motorroll.motorroll_api.model.CompatibilidadDeBancos;
import com.motorroll.motorroll_api.model.Producto;
import com.motorroll.motorroll_api.model.Turno;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TurnoMapper {
    private final ProductoMapper productoMapper;

    public BancoParaProbarResponse aBanco(Producto banco) {
        return BancoParaProbarResponse.builder()
                .id(banco.getId())
                .nombre(banco.getNombre())
                .marca(banco.getMarca())
                .categoria(banco.getCategoria().getNombre())
                .imagen(productoMapper.buscarPortada(banco))
                .vendedor(banco.getVendedor().getUsername())
                .fichaTecnica(productoMapper.aFichaTecnica(banco.getFichaTecnica()))
                .vehiculosCompatibles(CompatibilidadDeBancos.vehiculosPara(banco))
                .build();
    }

    public TurnoResponse aResponse(Turno turno) {
        Producto banco = turno.getBanco();

        return TurnoResponse.builder()
                .id(turno.getId())
                .bancoId(banco.getId())
                .banco(banco.getNombre())
                .imagenBanco(productoMapper.buscarPortada(banco))
                .fecha(turno.getFecha())
                .hora(turno.getHora())
                .vehiculo(turno.getVehiculo())
                .modeloVehiculo(turno.getModeloVehiculo())
                .comentario(turno.getComentario())
                .cotizarVtv(turno.isCotizarVtv())
                .estado(turno.getEstado())
                .build();
    }

    public HorarioOcupadoResponse aOcupado(Turno turno) {
        return new HorarioOcupadoResponse(turno.getBanco().getId(), turno.getFecha(), turno.getHora());
    }
}
