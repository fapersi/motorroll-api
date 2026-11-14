package com.motorroll.motorroll_api.dto.turno;

import com.motorroll.motorroll_api.model.EstadoTurno;
import com.motorroll.motorroll_api.model.TipoVehiculo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TurnoResponse {
    private Long id;
    private Long bancoId;
    private String banco;
    private String imagenBanco;
    private LocalDate fecha;
    private String hora;
    private TipoVehiculo vehiculo;
    private String modeloVehiculo;
    private String comentario;
    private EstadoTurno estado;
}
