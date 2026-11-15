package com.motorroll.motorroll_api.dto.resena;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResenasDelProductoResponse {
    private Double promedio;
    private int cantidad;
    private List<Long> porEstrellas;
    private List<ResenaResponse> resenas;
    private boolean puedeOpinar;
}
