package com.motorroll.motorroll_api.dto.usuario;

import com.motorroll.motorroll_api.model.Rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/** Vista publica del usuario: nunca expone la contrasenia. */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioResponse {

    private Long id;
    private String username;
    private String email;
    private String nombre;
    private String apellido;
    private Rol rol;
    private LocalDateTime fechaAlta;
    private boolean activo;
}
