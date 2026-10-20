package com.motorroll.motorroll_api.exception;

import com.motorroll.motorroll_api.dto.common.ApiError;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class ManejadorGlobalDeExcepciones {
    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<ApiError> manejarNoEncontrado(RecursoNoEncontradoException ex, HttpServletRequest request) {
        return armarRespuesta(HttpStatus.NOT_FOUND, ex.getMessage(), request);
    }

    @ExceptionHandler(RecursoDuplicadoException.class)
    public ResponseEntity<ApiError> manejarDuplicado(RecursoDuplicadoException ex, HttpServletRequest request) {
        return armarRespuesta(HttpStatus.CONFLICT, ex.getMessage(), request);
    }

    @ExceptionHandler(ReglaDeNegocioException.class)
    public ResponseEntity<ApiError> manejarReglaDeNegocio(ReglaDeNegocioException ex, HttpServletRequest request) {
        return armarRespuesta(HttpStatus.BAD_REQUEST, ex.getMessage(), request);
    }

    @ExceptionHandler(CredencialesInvalidasException.class)
    public ResponseEntity<ApiError> manejarCredenciales(CredencialesInvalidasException ex, HttpServletRequest request) {
        return armarRespuesta(HttpStatus.UNAUTHORIZED, ex.getMessage(), request);
    }

    @ExceptionHandler({OperacionNoPermitidaException.class, AccessDeniedException.class})
    public ResponseEntity<ApiError> manejarProhibido(Exception ex, HttpServletRequest request) {
        return armarRespuesta(HttpStatus.FORBIDDEN, ex.getMessage(), request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> manejarValidaciones(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> errores = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error -> errores.put(error.getField(), error.getDefaultMessage()));

        ApiError cuerpo = ApiError.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .mensaje("Hay campos invalidos en la solicitud")
                .path(request.getRequestURI())
                .errores(errores)
                .build();

        return ResponseEntity.badRequest().body(cuerpo);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiError> manejarMetodoNoSoportado(HttpRequestMethodNotSupportedException ex,
                                                            HttpServletRequest request) {
        String permitidos = ex.getSupportedHttpMethods() == null ? "" :
                " Metodos permitidos: " + ex.getSupportedHttpMethods() + ".";

        return armarRespuesta(HttpStatus.METHOD_NOT_ALLOWED,
                "El metodo " + ex.getMethod() + " no esta soportado en esta ruta." + permitidos, request);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> manejarJsonIlegible(HttpMessageNotReadableException ex,
                                                        HttpServletRequest request) {
        return armarRespuesta(HttpStatus.BAD_REQUEST,
                "El cuerpo de la solicitud no es un JSON valido o no tiene el formato esperado", request);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiError> manejarTipoInvalido(MethodArgumentTypeMismatchException ex,
                                                        HttpServletRequest request) {
        return armarRespuesta(HttpStatus.BAD_REQUEST,
                "El valor '" + ex.getValue() + "' no es valido para el parametro " + ex.getName(), request);
    }

    @ExceptionHandler({HttpMediaTypeNotSupportedException.class,
                       MissingServletRequestPartException.class,
                       MissingServletRequestParameterException.class})
    public ResponseEntity<ApiError> manejarRequestIncompleto(Exception ex, HttpServletRequest request) {
        return armarRespuesta(HttpStatus.BAD_REQUEST,
                "Falta el archivo o el formato del request no es el esperado. "
                        + "Para subir una foto hay que enviarla como multipart/form-data en el campo 'imagen'",
                request);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiError> manejarArchivoDemasiadoGrande(MaxUploadSizeExceededException ex,
                                                                  HttpServletRequest request) {
        return armarRespuesta(HttpStatus.PAYLOAD_TOO_LARGE,
                "El archivo es demasiado grande. El maximo permitido es 5 MB", request);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> manejarDatosRelacionados(DataIntegrityViolationException ex,
                                                             HttpServletRequest request) {
        return armarRespuesta(HttpStatus.CONFLICT,
                "No se puede eliminar porque tiene datos relacionados (productos, carrito u ordenes). "
                        + "Si es un usuario, se puede deshabilitar", request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> manejarErrorInesperado(Exception ex, HttpServletRequest request) {
        return armarRespuesta(HttpStatus.INTERNAL_SERVER_ERROR,
                "Ocurrio un error inesperado: " + ex.getMessage(), request);
    }

    private ResponseEntity<ApiError> armarRespuesta(HttpStatus status, String mensaje, HttpServletRequest request) {
        ApiError cuerpo = ApiError.builder()
                .timestamp(LocalDateTime.now())
                .status(status.value())
                .error(status.getReasonPhrase())
                .mensaje(mensaje)
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(status).body(cuerpo);
    }
}
