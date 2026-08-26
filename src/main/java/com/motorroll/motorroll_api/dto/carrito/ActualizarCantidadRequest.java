package com.motorroll.motorroll_api.dto.carrito;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActualizarCantidadRequest {

    @NotNull(message = "Tenes que indicar la cantidad")
    @Min(value = 1, message = "La cantidad minima es 1")
    private Integer cantidad;
}
