package com.motorroll.motorroll_api.dto.turno;

import com.motorroll.motorroll_api.model.TipoVehiculo;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurnoRequest {
    @NotNull(message = "Elegí el banco que querés probar")
    private Long bancoId;

    @NotNull(message = "Elegí el día del turno")
    @Future(message = "El turno tiene que ser a partir de mañana")
    private LocalDate fecha;

    @NotBlank(message = "Elegí el horario")
    private String hora;

    @NotNull(message = "Indicá con qué vehículo venís")
    private TipoVehiculo vehiculo;

    @NotBlank(message = "Indicá la marca y el modelo del vehículo")
    @Size(max = 80, message = "La marca y el modelo no pueden superar los 80 caracteres")
    private String modeloVehiculo;

    @Size(max = 300, message = "El comentario no puede superar los 300 caracteres")
    private String comentario;

    private boolean cotizarVtv;
}
