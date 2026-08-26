package com.motorroll.motorroll_api.controller;

import com.motorroll.motorroll_api.dto.usuario.ActualizarPerfilRequest;
import com.motorroll.motorroll_api.dto.usuario.CambiarEstadoRequest;
import com.motorroll.motorroll_api.dto.usuario.CambiarRolRequest;
import com.motorroll.motorroll_api.dto.usuario.UsuarioResponse;
import com.motorroll.motorroll_api.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Perfil del usuario logueado y administracion de cuentas.
 * El username sale del token, nunca de la URL: asi nadie puede tocar el perfil de otro.
 */
@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> verPerfil(Authentication authentication) {
        return ResponseEntity.ok(usuarioService.verPerfil(authentication.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<UsuarioResponse> actualizarPerfil(Authentication authentication,
                                                            @Valid @RequestBody ActualizarPerfilRequest request) {
        return ResponseEntity.ok(usuarioService.actualizarPerfil(authentication.getName(), request));
    }

    // ---------------- Administracion de cuentas (solo ADMIN) ----------------

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UsuarioResponse>> listar() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.obtenerPorId(id));
    }

    /** Asignacion de permisos: cambia el rol de la cuenta. */
    @PutMapping("/{id}/rol")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> cambiarRol(@PathVariable Long id,
                                                      @Valid @RequestBody CambiarRolRequest request) {
        return ResponseEntity.ok(usuarioService.cambiarRol(id, request.getRol()));
    }

    /** Habilita o deshabilita la cuenta sin borrarla. */
    @PutMapping("/{id}/estado")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> cambiarEstado(@PathVariable Long id,
                                                         @Valid @RequestBody CambiarEstadoRequest request) {
        return ResponseEntity.ok(usuarioService.cambiarEstado(id, request.getActivo()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
