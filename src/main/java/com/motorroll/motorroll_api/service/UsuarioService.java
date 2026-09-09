package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.usuario.ActualizarPerfilRequest;
import com.motorroll.motorroll_api.dto.usuario.UsuarioResponse;
import com.motorroll.motorroll_api.model.Rol;
import com.motorroll.motorroll_api.model.Usuario;

import java.util.List;

public interface UsuarioService {
    UsuarioResponse verPerfil(String username);

    UsuarioResponse actualizarPerfil(String username, ActualizarPerfilRequest request);

    List<UsuarioResponse> listarTodos();

    UsuarioResponse obtenerPorId(Long id);

    UsuarioResponse cambiarRol(Long id, Rol nuevoRol);

    UsuarioResponse cambiarEstado(Long id, boolean activo);

    void eliminar(Long id);

    Usuario buscarEntidadPorUsername(String username);
}
