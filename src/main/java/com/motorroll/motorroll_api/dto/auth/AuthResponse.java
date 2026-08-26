package com.motorroll.motorroll_api.dto.auth;

import com.motorroll.motorroll_api.dto.usuario.UsuarioResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String token;

    @Builder.Default
    private String tipo = "Bearer";

    private long expiraEnMs;

    private UsuarioResponse usuario;
}
