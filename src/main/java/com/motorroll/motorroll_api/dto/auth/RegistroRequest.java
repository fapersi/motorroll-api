package com.motorroll.motorroll_api.dto.auth;

import com.motorroll.motorroll_api.model.Rol;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Datos que pide el enunciado para registrarse: usuario, mail, contrasenia, nombre y apellido. */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistroRequest {

    @NotBlank(message = "El nombre de usuario es obligatorio")
    @Size(min = 4, max = 50, message = "El nombre de usuario debe tener entre 4 y 50 caracteres")
    private String username;

    @NotBlank(message = "El mail es obligatorio")
    @Email(message = "El mail no tiene un formato valido")
    private String email;

    @NotBlank(message = "La contrasenia es obligatoria")
    @Size(min = 6, max = 100, message = "La contrasenia debe tener al menos 6 caracteres")
    private String password;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    private String apellido;

    /** COMPRADOR o VENDEDOR. El rol ADMIN no se puede pedir desde el registro publico. */
    @NotNull(message = "Tenes que indicar si te registras como COMPRADOR o VENDEDOR")
    private Rol rol;
}
