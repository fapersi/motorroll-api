package com.motorroll.motorroll_api.mapper;

import com.motorroll.motorroll_api.dto.usuario.UsuarioResponse;
import com.motorroll.motorroll_api.model.Usuario;
import org.springframework.stereotype.Component;

import java.util.List;

/** Traduce entidades a DTO para que la API nunca exponga la contrasenia ni las relaciones internas. */
@Component
public class UsuarioMapper {

    public UsuarioResponse aResponse(Usuario usuario) {
        return UsuarioResponse.builder()
                .id(usuario.getId())
                .username(usuario.getUsername())
                .email(usuario.getEmail())
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .rol(usuario.getRol())
                .fechaAlta(usuario.getFechaAlta())
                .activo(usuario.isActivo())
                .build();
    }

    public List<UsuarioResponse> aResponse(List<Usuario> usuarios) {
        return usuarios.stream().map(this::aResponse).toList();
    }
}
