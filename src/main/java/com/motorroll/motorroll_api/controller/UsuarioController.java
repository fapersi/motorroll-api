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

    @PutMapping("/{id}/rol")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> cambiarRol(@PathVariable Long id,
                                                      @Valid @RequestBody CambiarRolRequest request) {
        return ResponseEntity.ok(usuarioService.cambiarRol(id, request.getRol()));
    }

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
