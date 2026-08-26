package com.motorroll.motorroll_api.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

/** Cuerpo unico de respuesta para todos los errores de la API. */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiError {

    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String mensaje;
    private String path;

    /** Solo se completa cuando fallan las validaciones de un DTO: campo -> motivo. */
    private Map<String, String> errores;
}
