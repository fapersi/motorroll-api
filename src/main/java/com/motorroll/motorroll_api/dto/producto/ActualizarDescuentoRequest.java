package com.motorroll.motorroll_api.dto.producto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Gestion de descuentos sobre productos individuales. */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActualizarDescuentoRequest {

    @NotNull(message = "El descuento es obligatorio")
    @Min(value = 0, message = "El descuento no puede ser menor a 0")
    @Max(value = 100, message = "El descuento no puede ser mayor a 100")
    private Integer descuento;
}
