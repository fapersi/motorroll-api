package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.producto.ArchivoImagen;
import com.motorroll.motorroll_api.dto.producto.ImagenContenidoResponse;
import com.motorroll.motorroll_api.dto.producto.ImagenResponse;
import com.motorroll.motorroll_api.dto.producto.ProductoDetalleResponse;
import com.motorroll.motorroll_api.dto.producto.ProductoRequest;
import com.motorroll.motorroll_api.dto.producto.ProductoResumenResponse;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

public interface ProductoService {
    List<ProductoResumenResponse> buscar(String texto,
                                         Long categoriaId,
                                         String marca,
                                         BigDecimal precioMin,
                                         BigDecimal precioMax,
                                         boolean soloConStock,
                                         String ordenarPor);

    ProductoDetalleResponse obtenerDetalle(Long id);

    List<String> listarMarcas();

    List<ProductoDetalleResponse> misPublicaciones(String username);

    ProductoDetalleResponse crear(String username, ProductoRequest request);

    ProductoDetalleResponse actualizar(String username, Long id, ProductoRequest request);

    ProductoDetalleResponse actualizarStock(String username, Long id, Integer stock);

    ProductoDetalleResponse actualizarDescuento(String username, Long id, Integer descuento);

    void eliminar(String username, Long id);

    ImagenResponse agregarImagen(String username, Long productoId, MultipartFile archivo, Integer orden);

    ArchivoImagen obtenerContenidoDeImagen(Long productoId, Long imagenId);

    ImagenContenidoResponse obtenerImagenEnBase64(Long productoId, Long imagenId);

    void eliminarImagen(String username, Long productoId, Long imagenId);
}
