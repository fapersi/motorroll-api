package com.motorroll.motorroll_api.controller;

import com.motorroll.motorroll_api.dto.producto.ActualizarDescuentoRequest;
import com.motorroll.motorroll_api.dto.producto.ActualizarStockRequest;
import com.motorroll.motorroll_api.dto.producto.ArchivoImagen;
import com.motorroll.motorroll_api.dto.producto.ImagenContenidoResponse;
import com.motorroll.motorroll_api.dto.producto.ImagenResponse;
import com.motorroll.motorroll_api.dto.producto.ProductoDetalleResponse;
import com.motorroll.motorroll_api.dto.producto.ProductoRequest;
import com.motorroll.motorroll_api.dto.producto.ProductoResumenResponse;
import com.motorroll.motorroll_api.service.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {
    private final ProductoService productoService;

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

    @GetMapping("/marcas")
    public ResponseEntity<List<String>> listarMarcas() {
        return ResponseEntity.ok(productoService.listarMarcas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDetalleResponse> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.obtenerDetalle(id));
    }

    @GetMapping("/mis-publicaciones")
    public ResponseEntity<List<ProductoDetalleResponse>> misPublicaciones(Authentication authentication) {
        return ResponseEntity.ok(productoService.misPublicaciones(authentication.getName()));
    }

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

    @PatchMapping("/{id}/stock")
    public ResponseEntity<ProductoDetalleResponse> actualizarStock(Authentication authentication,
                                                                   @PathVariable Long id,
                                                                   @Valid @RequestBody ActualizarStockRequest request) {
        return ResponseEntity.ok(
                productoService.actualizarStock(authentication.getName(), id, request.getStock()));
    }

    @PatchMapping("/{id}/descuento")
    public ResponseEntity<ProductoDetalleResponse> actualizarDescuento(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody ActualizarDescuentoRequest request) {
        return ResponseEntity.ok(
                productoService.actualizarDescuento(authentication.getName(), id, request.getDescuento()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(Authentication authentication, @PathVariable Long id) {
        productoService.eliminar(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(path = "/{id}/imagenes", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ImagenResponse> subirImagen(Authentication authentication,
                                                      @PathVariable Long id,
                                                      @RequestParam("imagen") MultipartFile imagen,
                                                      @RequestParam(required = false) Integer orden) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productoService.agregarImagen(authentication.getName(), id, imagen, orden));
    }

    @GetMapping("/{id}/imagenes/{imagenId}/contenido")
    public ResponseEntity<byte[]> verImagen(@PathVariable Long id, @PathVariable Long imagenId) {
        ArchivoImagen archivo = productoService.obtenerContenidoDeImagen(id, imagenId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(archivo.contentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + archivo.nombreArchivo() + "\"")
                .body(archivo.datos());
    }

    @GetMapping("/{id}/imagenes/{imagenId}")
    public ResponseEntity<ImagenContenidoResponse> verImagenBase64(@PathVariable Long id,
                                                                   @PathVariable Long imagenId) {
        return ResponseEntity.ok(productoService.obtenerImagenEnBase64(id, imagenId));
    }

    @DeleteMapping("/{id}/imagenes/{imagenId}")
    public ResponseEntity<Void> eliminarImagen(Authentication authentication,
                                               @PathVariable Long id,
                                               @PathVariable Long imagenId) {
        productoService.eliminarImagen(authentication.getName(), id, imagenId);
        return ResponseEntity.noContent().build();
    }
}
