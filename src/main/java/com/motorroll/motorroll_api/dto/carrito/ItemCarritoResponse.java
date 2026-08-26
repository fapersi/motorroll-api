package com.motorroll.motorroll_api.dto.carrito;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemCarritoResponse {

    private Long id;
    private Long productoId;
    private String nombreProducto;
    private String imagen;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal precioUnitarioConDescuento;
    private Integer descuento;
    private BigDecimal subtotal;
    private Integer stockDisponible;
    private boolean hayStockSuficiente;
}
