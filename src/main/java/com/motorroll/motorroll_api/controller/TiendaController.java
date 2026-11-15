package com.motorroll.motorroll_api.controller;

import com.motorroll.motorroll_api.dto.producto.ArchivoImagen;
import com.motorroll.motorroll_api.dto.tienda.TiendaRequest;
import com.motorroll.motorroll_api.dto.tienda.TiendaResponse;
import com.motorroll.motorroll_api.service.TiendaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TiendaController {
    private final TiendaService tiendaService;

    @GetMapping("/tiendas")
    public ResponseEntity<List<TiendaResponse>> listar() {
        return ResponseEntity.ok(tiendaService.listar());
    }

    @GetMapping("/tiendas/{username}")
    public ResponseEntity<TiendaResponse> obtener(@PathVariable String username) {
        return ResponseEntity.ok(tiendaService.obtener(username));
    }

    @GetMapping("/tiendas/{username}/logo")
    public ResponseEntity<byte[]> verLogo(@PathVariable String username) {
        ArchivoImagen archivo = tiendaService.obtenerLogo(username);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(archivo.contentType()))
                .body(archivo.datos());
    }

    @GetMapping("/mi-tienda")
    public ResponseEntity<TiendaResponse> miTienda(Authentication authentication) {
        return ResponseEntity.ok(tiendaService.miTienda(authentication.getName()));
    }

    @PutMapping("/mi-tienda")
    public ResponseEntity<TiendaResponse> actualizar(Authentication authentication,
                                                     @Valid @RequestBody TiendaRequest request) {
        return ResponseEntity.ok(tiendaService.actualizar(authentication.getName(), request));
    }

    @PostMapping(path = "/mi-tienda/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TiendaResponse> cambiarLogo(Authentication authentication,
                                                      @RequestParam("logo") MultipartFile logo) {
        return ResponseEntity.ok(tiendaService.cambiarLogo(authentication.getName(), logo));
    }
}
