package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.turno.AgendaResponse;
import com.motorroll.motorroll_api.dto.turno.BancoParaProbarResponse;
import com.motorroll.motorroll_api.dto.turno.TurnoRequest;
import com.motorroll.motorroll_api.dto.turno.TurnoResponse;

import java.util.List;

public interface TurnoService {
    List<BancoParaProbarResponse> listarBancos();

    AgendaResponse verAgenda();

    List<TurnoResponse> misTurnos(String username);

    TurnoResponse reservar(String username, TurnoRequest request);

    TurnoResponse cancelar(String username, Long id);
}
