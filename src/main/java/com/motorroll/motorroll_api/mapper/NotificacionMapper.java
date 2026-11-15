package com.motorroll.motorroll_api.mapper;

import com.motorroll.motorroll_api.dto.notificacion.NotificacionResponse;
import com.motorroll.motorroll_api.model.Notificacion;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NotificacionMapper {
    public NotificacionResponse aResponse(Notificacion notificacion) {
        return NotificacionResponse.builder()
                .id(notificacion.getId())
                .tipo(notificacion.getTipo())
                .titulo(notificacion.getTitulo())
                .mensaje(notificacion.getMensaje())
                .enlace(notificacion.getEnlace())
                .leida(notificacion.isLeida())
                .fecha(notificacion.getFecha())
                .build();
    }

    public List<NotificacionResponse> aResponse(List<Notificacion> notificaciones) {
        return notificaciones.stream().map(this::aResponse).toList();
    }
}
