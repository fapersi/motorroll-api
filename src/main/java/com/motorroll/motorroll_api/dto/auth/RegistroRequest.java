package com.motorroll.motorroll_api.dto.auth;

import com.motorroll.motorroll_api.model.Rol;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistroRequest {
    @NotBlank(message = "El nombre de usuario es obligatorio")
    @Size(min = 4, max = 50, message = "El nombre de usuario debe tener entre 4 y 50 caracteres")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+$",
            message = "El nombre de usuario solo puede tener letras, números, punto, guion y guion bajo")
    private String username;

    @NotBlank(message = "El mail es obligatorio")
    @Email(message = "El mail no tiene un formato válido")
    @Size(max = 120, message = "El mail no puede superar los 120 caracteres")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, max = 100, message = "La contraseña debe tener entre 6 y 100 caracteres")
    private String password;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 60, message = "El nombre no puede superar los 60 caracteres")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 60, message = "El apellido no puede superar los 60 caracteres")
    private String apellido;

    @NotNull(message = "Tenés que indicar si te registrás como COMPRADOR o VENDEDOR")
    private Rol rol;
}
