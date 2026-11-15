package com.motorroll.motorroll_api.dto.notificacion;

import com.motorroll.motorroll_api.model.TipoNotificacion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificacionResponse {
    private Long id;
    private TipoNotificacion tipo;
    private String titulo;
    private String mensaje;
    private String enlace;
    private boolean leida;
    private LocalDateTime fecha;
}
