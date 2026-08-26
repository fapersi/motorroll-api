package com.motorroll.motorroll_api.dto.producto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/** Ficha completa del producto, con la galeria de imagenes y los datos tecnicos. */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductoDetalleResponse {

    private Long id;
    private String nombre;
    private String descripcion;
    private String marca;
    private BigDecimal precio;
    private BigDecimal precioFinal;
    private Integer descuento;
    private Integer stock;
    private boolean hayStock;
    private boolean esServicio;
    private boolean activo;
    private LocalDateTime fechaAlta;
    private Long categoriaId;
    private String categoriaNombre;
    private Long vendedorId;
    private String vendedor;
    private List<ImagenResponse> imagenes;
    private FichaTecnicaResponse fichaTecnica;
}
