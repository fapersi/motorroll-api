package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.orden.OrdenResponse;

import java.util.List;

public interface OrdenService {

    List<OrdenResponse> misOrdenes(String username);

    OrdenResponse obtenerPorId(String username, Long id);
}
