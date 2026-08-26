package com.motorroll.motorroll_api.controller;

import com.motorroll.motorroll_api.dto.auth.AuthResponse;
import com.motorroll.motorroll_api.dto.auth.LoginRequest;
import com.motorroll.motorroll_api.dto.auth.RegistroRequest;
import com.motorroll.motorroll_api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Capa de presentacion: recibe el request HTTP y delega en el servicio.
 * Estos dos endpoints son los unicos publicos que no piden token.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /** Registro de usuarios como compradores y vendedores. */
    @PostMapping("/registro")
    public ResponseEntity<AuthResponse> registrar(@Valid @RequestBody RegistroRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registrar(request));
    }

    /** Autenticacion de usuarios mediante usuario y contrasenia: devuelve el token JWT. */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
