package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.auth.AuthResponse;
import com.motorroll.motorroll_api.dto.auth.LoginRequest;
import com.motorroll.motorroll_api.dto.auth.RegistroRequest;

public interface AuthService {
    AuthResponse registrar(RegistroRequest request);

    AuthResponse login(LoginRequest request);
}
