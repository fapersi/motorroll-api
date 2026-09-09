package com.motorroll.motorroll_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class OperacionNoPermitidaException extends RuntimeException {
    public OperacionNoPermitidaException(String mensaje) {
        super(mensaje);
    }
}
