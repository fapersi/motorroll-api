package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.dto.auth.AuthResponse;
import com.motorroll.motorroll_api.dto.usuario.ActualizarPerfilRequest;
import com.motorroll.motorroll_api.dto.usuario.UsuarioResponse;
import com.motorroll.motorroll_api.exception.RecursoDuplicadoException;
import com.motorroll.motorroll_api.exception.RecursoNoEncontradoException;
import com.motorroll.motorroll_api.exception.ReglaDeNegocioException;
import com.motorroll.motorroll_api.mapper.UsuarioMapper;
import com.motorroll.motorroll_api.model.Rol;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.CarritoRepository;
import com.motorroll.motorroll_api.repository.NotificacionRepository;
import com.motorroll.motorroll_api.repository.TiendaRepository;
import com.motorroll.motorroll_api.repository.UsuarioRepository;
import com.motorroll.motorroll_api.security.JwtService;
import com.motorroll.motorroll_api.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final CarritoRepository carritoRepository;
    private final NotificacionRepository notificacionRepository;
    private final TiendaRepository tiendaRepository;
    private final UsuarioMapper usuarioMapper;
    private final JwtService jwtService;

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponse verPerfil(String username) {
        return usuarioMapper.aResponse(buscarEntidadPorUsername(username));
    }

    @Override
    @Transactional
    public AuthResponse actualizarPerfil(String username, ActualizarPerfilRequest request) {
        Usuario usuario = buscarEntidadPorUsername(username);

        if (!usuario.getEmail().equalsIgnoreCase(request.getEmail())
                && usuarioRepository.existsByEmailIgnoreCase(request.getEmail())) {
            throw new RecursoDuplicadoException("Ya existe una cuenta registrada con el mail " + request.getEmail());
        }

        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setEmail(request.getEmail());

        Usuario guardado = usuarioRepository.save(usuario);

        // Se emite un token nuevo con los datos actualizados, así el cliente no tiene que volver a loguearse
        return AuthResponse.builder()
                .token(jwtService.generarToken(guardado))
                .tipo("Bearer")
                .expiraEnMs(jwtService.getExpiracionMs())
                .usuario(usuarioMapper.aResponse(guardado))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponse> listarTodos() {
        return usuarioMapper.aResponse(usuarioRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponse obtenerPorId(Long id) {
        return usuarioMapper.aResponse(buscarEntidadPorId(id));
    }

    @Override
    @Transactional
    public UsuarioResponse cambiarRol(String adminUsername, Long id, Rol nuevoRol) {
        Usuario usuario = buscarEntidadPorId(id);
        if (usuario.getUsername().equals(adminUsername)) {
            throw new ReglaDeNegocioException("No podés cambiar tu propio rol");
        }
        usuario.setRol(nuevoRol);
        return usuarioMapper.aResponse(usuarioRepository.save(usuario));
    }

    @Override
    @Transactional
    public UsuarioResponse cambiarEstado(String adminUsername, Long id, boolean activo) {
        Usuario usuario = buscarEntidadPorId(id);
        if (usuario.getUsername().equals(adminUsername)) {
            throw new ReglaDeNegocioException("No podés deshabilitar ni habilitar tu propia cuenta");
        }
        usuario.setActivo(activo);
        return usuarioMapper.aResponse(usuarioRepository.save(usuario));
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        Usuario usuario = buscarEntidadPorId(id);

        if (usuario.getRol() == Rol.ADMIN) {
            throw new ReglaDeNegocioException("No se puede eliminar una cuenta con rol ADMIN");
        }

        carritoRepository.deleteAll(carritoRepository.findByCompradorId(id));
        notificacionRepository.deleteByUsuarioId(id);
        tiendaRepository.findByVendedorId(id).ifPresent(tiendaRepository::delete);
        usuarioRepository.delete(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario buscarEntidadPorUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RecursoNoEncontradoException("No se encontró el usuario " + username));
    }

    private Usuario buscarEntidadPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("el usuario", id));
    }
}