package com.motorroll.motorroll_api.dto.turno;

import java.time.LocalDate;

public record HorarioOcupadoResponse(Long bancoId, LocalDate fecha, String hora) {
}
