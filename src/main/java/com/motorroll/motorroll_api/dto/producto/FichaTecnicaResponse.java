package com.motorroll.motorroll_api.dto.producto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FichaTecnicaResponse {

    private Integer potenciaMaximaHp;
    private Integer velocidadMaximaKmh;
    private String tipoTraccion;
    private Integer diametroRodilloMm;
    private BigDecimal pesoKg;
    private String requerimientosSala;
}
