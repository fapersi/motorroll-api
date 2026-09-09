package com.motorroll.motorroll_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ReglaDeNegocioException extends RuntimeException {
    public ReglaDeNegocioException(String mensaje) {
        super(mensaje);
    }
}
