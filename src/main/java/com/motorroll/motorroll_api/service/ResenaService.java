package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.resena.ResenaRequest;
import com.motorroll.motorroll_api.dto.resena.ResenasDelProductoResponse;

public interface ResenaService {
    ResenasDelProductoResponse listar(Long productoId, String username);

    ResenasDelProductoResponse opinar(String username, Long productoId, ResenaRequest request);
}
