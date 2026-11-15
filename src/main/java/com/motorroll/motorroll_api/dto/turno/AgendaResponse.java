package com.motorroll.motorroll_api.dto.turno;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AgendaResponse {
    private List<String> horarios;
    private int diasDeAnticipacion;
    private List<HorarioOcupadoResponse> ocupados;
    private List<String> feriados;
}
