package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.producto.ProductoDetalleResponse;
import com.motorroll.motorroll_api.dto.producto.ProductoRequest;
import com.motorroll.motorroll_api.dto.producto.ProductoResumenResponse;

import java.math.BigDecimal;
import java.util.List;

public interface ProductoService {

    /** Catalogo publico: todos los filtros son opcionales. */
    List<ProductoResumenResponse> buscar(String texto,
                                         Long categoriaId,
                                         String marca,
                                         BigDecimal precioMin,
                                         BigDecimal precioMax,
                                         boolean soloConStock,
                                         String ordenarPor);

    ProductoDetalleResponse obtenerDetalle(Long id);

    List<String> listarMarcas();

    // --- Operaciones del vendedor duenio de la publicacion ---

    List<ProductoDetalleResponse> misPublicaciones(String username);

    ProductoDetalleResponse crear(String username, ProductoRequest request);

    ProductoDetalleResponse actualizar(String username, Long id, ProductoRequest request);

    ProductoDetalleResponse actualizarStock(String username, Long id, Integer stock);

    ProductoDetalleResponse actualizarDescuento(String username, Long id, Integer descuento);

    /** Baja logica de la publicacion. */
    void eliminar(String username, Long id);
}
