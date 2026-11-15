package com.motorroll.motorroll_api.dto.producto;

import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FichaTecnicaRequest {
    @PositiveOrZero(message = "La potencia máxima no puede ser negativa")
    private Integer potenciaMaximaHp;

    @PositiveOrZero(message = "La velocidad máxima no puede ser negativa")
    private Integer velocidadMaximaKmh;

    @Size(max = 60, message = "El tipo de tracción no puede superar los 60 caracteres")
    private String tipoTraccion;

    @PositiveOrZero(message = "El diámetro de rodillo no puede ser negativo")
    private Integer diametroRodilloMm;

    @PositiveOrZero(message = "El peso no puede ser negativo")
    private BigDecimal pesoKg;

    @Size(max = 500, message = "Los requerimientos de sala no pueden superar los 500 caracteres")
    private String requerimientosSala;
}
