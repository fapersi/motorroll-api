package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.dto.orden.OrdenResponse;
import com.motorroll.motorroll_api.exception.RecursoNoEncontradoException;
import com.motorroll.motorroll_api.mapper.OrdenMapper;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.OrdenRepository;
import com.motorroll.motorroll_api.service.OrdenService;
import com.motorroll.motorroll_api.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/** Historial de compras: cada usuario solo puede ver sus propias ordenes. */
@Service
@RequiredArgsConstructor
public class OrdenServiceImpl implements OrdenService {

    private final OrdenRepository ordenRepository;
    private final UsuarioService usuarioService;
    private final OrdenMapper ordenMapper;

    @Override
    @Transactional(readOnly = true)
    public List<OrdenResponse> misOrdenes(String username) {
        Usuario comprador = usuarioService.buscarEntidadPorUsername(username);

        return ordenMapper.aResponse(ordenRepository.findByCompradorIdOrderByFechaDesc(comprador.getId()));
    }

    @Override
    @Transactional(readOnly = true)
    public OrdenResponse obtenerPorId(String username, Long id) {
        Usuario comprador = usuarioService.buscarEntidadPorUsername(username);

        return ordenRepository.findByIdAndCompradorId(id, comprador.getId())
                .map(ordenMapper::aResponse)
                .orElseThrow(() -> new RecursoNoEncontradoException("la orden", id));
    }
}
