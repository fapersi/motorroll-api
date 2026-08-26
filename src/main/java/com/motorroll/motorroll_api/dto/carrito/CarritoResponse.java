package com.motorroll.motorroll_api.dto.carrito;

import com.motorroll.motorroll_api.model.EstadoCarrito;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarritoResponse {

    private Long id;
    private EstadoCarrito estado;
    private List<ItemCarritoResponse> items;
    private int cantidadDeItems;
    private BigDecimal total;
}
