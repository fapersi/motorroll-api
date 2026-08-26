package com.motorroll.motorroll_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/** Se lanza cuando la operacion es valida en formato pero rompe una regla del negocio
 *  (por ejemplo: agregar al carrito un producto sin stock). */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ReglaDeNegocioException extends RuntimeException {

    public ReglaDeNegocioException(String mensaje) {
        super(mensaje);
    }
}
