package com.motorroll.motorroll_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/** Se lanza cuando el usuario esta autenticado pero no es duenio del recurso
 *  o su rol no lo habilita a esa operacion. */
@ResponseStatus(HttpStatus.FORBIDDEN)
public class OperacionNoPermitidaException extends RuntimeException {

    public OperacionNoPermitidaException(String mensaje) {
        super(mensaje);
    }
}
