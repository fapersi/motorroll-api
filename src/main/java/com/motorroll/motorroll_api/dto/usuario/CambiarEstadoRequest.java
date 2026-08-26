package com.motorroll.motorroll_api.dto.usuario;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CambiarEstadoRequest {

    @NotNull(message = "Tenes que indicar si la cuenta queda activa o no")
    private Boolean activo;
}
