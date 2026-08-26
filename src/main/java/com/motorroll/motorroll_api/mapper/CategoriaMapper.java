package com.motorroll.motorroll_api.mapper;

import com.motorroll.motorroll_api.dto.categoria.CategoriaResponse;
import com.motorroll.motorroll_api.model.Categoria;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoriaMapper {

    public CategoriaResponse aResponse(Categoria categoria) {
        Categoria padre = categoria.getCategoriaPadre();

        return CategoriaResponse.builder()
                .id(categoria.getId())
                .nombre(categoria.getNombre())
                .descripcion(categoria.getDescripcion())
                .categoriaPadreId(padre != null ? padre.getId() : null)
                .categoriaPadreNombre(padre != null ? padre.getNombre() : null)
                .build();
    }

    public List<CategoriaResponse> aResponse(List<Categoria> categorias) {
        return categorias.stream().map(this::aResponse).toList();
    }
}
