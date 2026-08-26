package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.categoria.CategoriaRequest;
import com.motorroll.motorroll_api.dto.categoria.CategoriaResponse;

import java.util.List;

public interface CategoriaService {

    List<CategoriaResponse> listar();

    CategoriaResponse obtenerPorId(Long id);

    CategoriaResponse crear(CategoriaRequest request);

    CategoriaResponse actualizar(Long id, CategoriaRequest request);

    void eliminar(Long id);
}
