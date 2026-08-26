package com.motorroll.motorroll_api.controller;

import com.motorroll.motorroll_api.dto.producto.ActualizarDescuentoRequest;
import com.motorroll.motorroll_api.dto.producto.ActualizarStockRequest;
import com.motorroll.motorroll_api.dto.producto.ProductoDetalleResponse;
import com.motorroll.motorroll_api.dto.producto.ProductoRequest;
import com.motorroll.motorroll_api.dto.producto.ProductoResumenResponse;
import com.motorroll.motorroll_api.service.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

/**
 * Catalogo y gestion de publicaciones.
 *
 * Los GET del catalogo son publicos (se pueden ver los productos sin estar logueado).
 * El alta, la edicion, el stock, el descuento y la baja los hace el vendedor duenio de la publicacion.
 */
@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    /**
     * Catalogo con busqueda y filtrado. Todos los parametros son opcionales:
     * GET /api/productos?texto=inercial&categoriaId=2&precioMin=1000&precioMax=90000&ordenarPor=precio_asc
     */
    @GetMapping
    public ResponseEntity<List<ProductoResumenResponse>> buscar(
            @RequestParam(required = false) String texto,
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) BigDecimal precioMin,
            @RequestParam(required = false) BigDecimal precioMax,
            @RequestParam(required = false, defaultValue = "false") boolean soloConStock,
            @RequestParam(required = false) String ordenarPor) {

        return ResponseEntity.ok(productoService.buscar(
                texto, categoriaId, marca, precioMin, precioMax, soloConStock, ordenarPor));
    }

    /** Marcas disponibles, para armar el filtro del front. */
    @GetMapping("/marcas")
    public ResponseEntity<List<String>> listarMarcas() {
        return ResponseEntity.ok(productoService.listarMarcas());
    }

    /** Detalle del producto: imagenes, descripcion y ficha tecnica. */
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDetalleResponse> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.obtenerDetalle(id));
    }

    // ---------------- Gestion de productos (vendedor) ----------------

    /** Publicaciones del vendedor logueado, incluidas las dadas de baja. */
    @GetMapping("/mis-publicaciones")
    public ResponseEntity<List<ProductoDetalleResponse>> misPublicaciones(Authentication authentication) {
        return ResponseEntity.ok(productoService.misPublicaciones(authentication.getName()));
    }

    /** Alta de una publicacion con una o mas fotos, descripcion, categoria y precio. */
    @PostMapping
    public ResponseEntity<ProductoDetalleResponse> crear(Authentication authentication,
                                                         @Valid @RequestBody ProductoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productoService.crear(authentication.getName(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDetalleResponse> actualizar(Authentication authentication,
                                                              @PathVariable Long id,
                                                              @Valid @RequestBody ProductoRequest request) {
        return ResponseEntity.ok(productoService.actualizar(authentication.getName(), id, request));
    }

    /** El usuario que crea el producto maneja el stock del mismo. */
    @PatchMapping("/{id}/stock")
    public ResponseEntity<ProductoDetalleResponse> actualizarStock(Authentication authentication,
                                                                   @PathVariable Long id,
                                                                   @Valid @RequestBody ActualizarStockRequest request) {
        return ResponseEntity.ok(
                productoService.actualizarStock(authentication.getName(), id, request.getStock()));
    }

    /** Gestion de descuentos sobre productos individuales. */
    @PatchMapping("/{id}/descuento")
    public ResponseEntity<ProductoDetalleResponse> actualizarDescuento(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody ActualizarDescuentoRequest request) {

        return ResponseEntity.ok(
                productoService.actualizarDescuento(authentication.getName(), id, request.getDescuento()));
    }

    /** Baja de la publicacion. */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(Authentication authentication, @PathVariable Long id) {
        productoService.eliminar(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
