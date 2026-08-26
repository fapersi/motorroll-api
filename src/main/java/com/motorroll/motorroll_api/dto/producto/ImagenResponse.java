package com.motorroll.motorroll_api.dto.producto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImagenResponse {

    private Long id;
    private String url;
    private Integer orden;
}
