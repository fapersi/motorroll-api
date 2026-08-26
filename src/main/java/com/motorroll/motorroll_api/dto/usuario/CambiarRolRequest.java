package com.motorroll.motorroll_api.dto.usuario;

import com.motorroll.motorroll_api.model.Rol;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Asignacion de permisos: el ADMIN cambia el rol de una cuenta. */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CambiarRolRequest {

    @NotNull(message = "Tenes que indicar el nuevo rol")
    private Rol rol;
}
