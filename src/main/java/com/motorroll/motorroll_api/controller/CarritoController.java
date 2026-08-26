package com.motorroll.motorroll_api.controller;

import com.motorroll.motorroll_api.dto.carrito.ActualizarCantidadRequest;
import com.motorroll.motorroll_api.dto.carrito.AgregarItemRequest;
import com.motorroll.motorroll_api.dto.carrito.CarritoResponse;
import com.motorroll.motorroll_api.dto.orden.OrdenResponse;
import com.motorroll.motorroll_api.service.CarritoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Carrito del usuario logueado: agregar, modificar y eliminar productos,
 * y confirmar la compra con el calculo automatico del total.
 */
@RestController
@RequestMapping("/api/carrito")
@RequiredArgsConstructor
public class CarritoController {

    private final CarritoService carritoService;

    @GetMapping
    public ResponseEntity<CarritoResponse> verCarrito(Authentication authentication) {
        return ResponseEntity.ok(carritoService.verCarrito(authentication.getName()));
    }

    @PostMapping("/items")
    public ResponseEntity<CarritoResponse> agregarItem(Authentication authentication,
                                                       @Valid @RequestBody AgregarItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(carritoService.agregarItem(authentication.getName(), request));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CarritoResponse> actualizarCantidad(Authentication authentication,
                                                              @PathVariable Long itemId,
                                                              @Valid @RequestBody ActualizarCantidadRequest request) {
        return ResponseEntity.ok(
                carritoService.actualizarCantidad(authentication.getName(), itemId, request.getCantidad()));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CarritoResponse> eliminarItem(Authentication authentication, @PathVariable Long itemId) {
        return ResponseEntity.ok(carritoService.eliminarItem(authentication.getName(), itemId));
    }

    @DeleteMapping
    public ResponseEntity<CarritoResponse> vaciar(Authentication authentication) {
        return ResponseEntity.ok(carritoService.vaciar(authentication.getName()));
    }

    /** Checkout sin procesamiento de pago: valida y descuenta el stock, y genera la orden. */
    @PostMapping("/checkout")
    public ResponseEntity<OrdenResponse> checkout(Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(carritoService.checkout(authentication.getName()));
    }
}
