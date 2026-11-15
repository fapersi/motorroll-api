package com.motorroll.motorroll_api.dto.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActualizarPerfilRequest {
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 60, message = "El nombre no puede superar los 60 caracteres")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 60, message = "El apellido no puede superar los 60 caracteres")
    private String apellido;

    @NotBlank(message = "El mail es obligatorio")
    @Email(message = "El mail no tiene un formato válido")
    @Size(max = 120, message = "El mail no puede superar los 120 caracteres")
    private String email;
}
