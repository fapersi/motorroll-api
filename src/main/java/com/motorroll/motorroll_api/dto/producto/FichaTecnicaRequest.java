package com.motorroll.motorroll_api.dto.producto;

import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/** Ficha tecnica opcional del equipo (no aplica a repuestos chicos ni a servicios). */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FichaTecnicaRequest {

    @PositiveOrZero(message = "La potencia maxima no puede ser negativa")
    private Integer potenciaMaximaHp;

    @PositiveOrZero(message = "La velocidad maxima no puede ser negativa")
    private Integer velocidadMaximaKmh;

    @Size(max = 60)
    private String tipoTraccion;

    @PositiveOrZero(message = "El diametro de rodillo no puede ser negativo")
    private Integer diametroRodilloMm;

    @PositiveOrZero(message = "El peso no puede ser negativo")
    private BigDecimal pesoKg;

    @Size(max = 500)
    private String requerimientosSala;
}
