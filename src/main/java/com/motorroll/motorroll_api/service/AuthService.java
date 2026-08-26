package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.auth.AuthResponse;
import com.motorroll.motorroll_api.dto.auth.LoginRequest;
import com.motorroll.motorroll_api.dto.auth.RegistroRequest;

/** Registro de compradores y vendedores, y autenticacion con usuario y contrasenia. */
public interface AuthService {

    AuthResponse registrar(RegistroRequest request);

    AuthResponse login(LoginRequest request);
}
