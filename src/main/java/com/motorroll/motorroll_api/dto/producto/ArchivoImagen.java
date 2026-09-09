package com.motorroll.motorroll_api.dto.producto;

public record ArchivoImagen(byte[] datos, String contentType, String nombreArchivo) {
}
