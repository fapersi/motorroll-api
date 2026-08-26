package com.motorroll.motorroll_api.dto.producto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/** Vista de grilla del catalogo: foto de portada, nombre, marca, precio y estado de stock. */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductoResumenResponse {

    private Long id;
    private String nombre;
    private String marca;
    private BigDecimal precio;
    private BigDecimal precioFinal;
    private Integer descuento;
    private Integer stock;
    private boolean hayStock;
    private boolean esServicio;
    private String imagenPortada;
    private Long categoriaId;
    private String categoriaNombre;
    private String vendedor;
}
