package com.motorroll.motorroll_api.controller;

import com.motorroll.motorroll_api.dto.orden.OrdenResponse;
import com.motorroll.motorroll_api.service.OrdenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Historial de compras del usuario logueado. */
@RestController
@RequestMapping("/api/ordenes")
@RequiredArgsConstructor
public class OrdenController {

    private final OrdenService ordenService;

    @GetMapping
    public ResponseEntity<List<OrdenResponse>> misOrdenes(Authentication authentication) {
        return ResponseEntity.ok(ordenService.misOrdenes(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdenResponse> obtener(Authentication authentication, @PathVariable Long id) {
        return ResponseEntity.ok(ordenService.obtenerPorId(authentication.getName(), id));
    }
}
