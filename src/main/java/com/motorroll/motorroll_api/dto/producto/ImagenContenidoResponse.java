package com.motorroll.motorroll_api.dto.producto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImagenContenidoResponse {
    private Long id;
    private String nombreArchivo;
    private String contentType;
    private Integer tamanioBytes;
    private Integer orden;
    private String base64;
}
