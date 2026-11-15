package com.motorroll.motorroll_api.dto.tienda;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TiendaRequest {
    @NotBlank(message = "El nombre de la tienda es obligatorio")
    @Size(max = 60, message = "El nombre de la tienda no puede superar los 60 caracteres")
    private String nombre;

    @Size(max = 120, message = "El eslogan no puede superar los 120 caracteres")
    private String eslogan;

    @NotBlank(message = "Elegí el color principal")
    @Pattern(regexp = "^#[0-9a-fA-F]{6}$", message = "El color principal tiene que tener el formato #RRGGBB")
    private String colorPrincipal;

    @NotBlank(message = "Elegí el color secundario")
    @Pattern(regexp = "^#[0-9a-fA-F]{6}$", message = "El color secundario tiene que tener el formato #RRGGBB")
    private String colorSecundario;
}
