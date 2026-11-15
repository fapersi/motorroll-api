package com.motorroll.motorroll_api.controller;

import com.motorroll.motorroll_api.dto.notificacion.NotificacionResponse;
import com.motorroll.motorroll_api.service.NotificacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
@RequiredArgsConstructor
public class NotificacionController {
    private final NotificacionService notificacionService;

    @GetMapping
    public ResponseEntity<List<NotificacionResponse>> misNotificaciones(Authentication authentication) {
        return ResponseEntity.ok(notificacionService.misNotificaciones(authentication.getName()));
    }

    @PatchMapping("/{id}/leida")
    public ResponseEntity<NotificacionResponse> marcarLeida(Authentication authentication, @PathVariable Long id) {
        return ResponseEntity.ok(notificacionService.marcarLeida(authentication.getName(), id));
    }

    @PatchMapping("/leidas")
    public ResponseEntity<List<NotificacionResponse>> marcarTodasLeidas(Authentication authentication) {
        return ResponseEntity.ok(notificacionService.marcarTodasLeidas(authentication.getName()));
    }
}
