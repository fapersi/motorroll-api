package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.notificacion.NotificacionResponse;
import com.motorroll.motorroll_api.model.Orden;
import com.motorroll.motorroll_api.model.Turno;

import java.util.List;

public interface NotificacionService {
    List<NotificacionResponse> misNotificaciones(String username);

    NotificacionResponse marcarLeida(String username, Long id);

    List<NotificacionResponse> marcarTodasLeidas(String username);

    NotificacionResponse avisarCompra(Orden orden);

    NotificacionResponse avisarTurnoReservado(Turno turno);

    NotificacionResponse avisarTurnoCancelado(Turno turno);
}
