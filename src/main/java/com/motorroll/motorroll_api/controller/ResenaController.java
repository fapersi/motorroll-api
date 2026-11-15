package com.motorroll.motorroll_api.controller;

import com.motorroll.motorroll_api.dto.resena.ResenaRequest;
import com.motorroll.motorroll_api.dto.resena.ResenasDelProductoResponse;
import com.motorroll.motorroll_api.service.ResenaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/productos/{productoId}/resenas")
@RequiredArgsConstructor
public class ResenaController {
    private final ResenaService resenaService;

    @GetMapping
    public ResponseEntity<ResenasDelProductoResponse> listar(Authentication authentication,
                                                             @PathVariable Long productoId) {
        String username = authentication == null ? null : authentication.getName();
        return ResponseEntity.ok(resenaService.listar(productoId, username));
    }

    @PostMapping
    public ResponseEntity<ResenasDelProductoResponse> opinar(Authentication authentication,
                                                             @PathVariable Long productoId,
                                                             @Valid @RequestBody ResenaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(resenaService.opinar(authentication.getName(), productoId, request));
    }
}
