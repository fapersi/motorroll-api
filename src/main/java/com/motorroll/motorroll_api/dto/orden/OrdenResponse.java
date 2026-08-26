package com.motorroll.motorroll_api.dto.orden;

import com.motorroll.motorroll_api.model.EstadoOrden;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrdenResponse {

    private Long id;
    private LocalDateTime fecha;
    private EstadoOrden estado;
    private String comprador;
    private List<ItemOrdenResponse> items;
    private BigDecimal total;
}
