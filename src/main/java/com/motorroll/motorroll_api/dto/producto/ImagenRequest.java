package com.motorroll.motorroll_api.dto.producto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImagenRequest {

    @NotBlank(message = "La url de la imagen es obligatoria")
    @Size(max = 500, message = "La url no puede superar los 500 caracteres")
    private String url;

    /** Posicion en la galeria. La imagen de orden mas bajo se usa como portada. */
    private Integer orden;
}
