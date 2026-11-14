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
    @NotNull(message = "Elegi el banco que queres probar")
    private Long bancoId;

    @NotNull(message = "Elegi el dia del turno")
    @Future(message = "El turno tiene que ser a partir de manana")
    private LocalDate fecha;

    @NotBlank(message = "Elegi el horario")
    private String hora;

    @NotNull(message = "Indica con que vehiculo venis")
    private TipoVehiculo vehiculo;

    @NotBlank(message = "Indica la marca y el modelo del vehiculo")
    @Size(max = 80, message = "La marca y el modelo no pueden superar los 80 caracteres")
    private String modeloVehiculo;

    @Size(max = 300, message = "El comentario no puede superar los 300 caracteres")
    private String comentario;
}
