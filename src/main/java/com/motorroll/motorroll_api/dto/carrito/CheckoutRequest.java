package com.motorroll.motorroll_api.dto.carrito;

import com.motorroll.motorroll_api.model.MetodoPago;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutRequest {
    @NotNull(message = "Elegi un metodo de pago")
    private MetodoPago metodoPago;

    private boolean usarPuntos;

    @NotBlank(message = "Indica la direccion de entrega")
    @Size(max = 200, message = "La direccion no puede superar los 200 caracteres")
    private String direccionEnvio;

    @Min(value = 1, message = "Las cuotas van de 1 a 12")
    @Max(value = 12, message = "Las cuotas van de 1 a 12")
    private Integer cuotas;
}
