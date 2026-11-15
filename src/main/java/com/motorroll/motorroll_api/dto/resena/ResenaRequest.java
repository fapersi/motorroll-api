package com.motorroll.motorroll_api.dto.resena;

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
public class ResenaRequest {
    @NotNull(message = "Elegí de 1 a 5 estrellas")
    @Min(value = 1, message = "La calificación mínima es 1 estrella")
    @Max(value = 5, message = "La calificación máxima es 5 estrellas")
    private Integer estrellas;

    @NotBlank(message = "Contanos qué te pareció el producto")
    @Size(max = 1000, message = "El comentario no puede superar los 1000 caracteres")
    private String comentario;
}
