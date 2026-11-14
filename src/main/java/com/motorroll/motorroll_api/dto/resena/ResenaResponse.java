package com.motorroll.motorroll_api.dto.resena;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResenaResponse {
    private Long id;
    private Integer estrellas;
    private String comentario;
    private String autor;
    private String autorUsername;
    private LocalDateTime fecha;
}
