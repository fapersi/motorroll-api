package com.motorroll.motorroll_api.dto.tienda;

import com.motorroll.motorroll_api.dto.producto.ProductoResumenResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TiendaResponse {
    private String vendedor;
    private String nombre;
    private String eslogan;
    private String colorPrincipal;
    private String colorSecundario;
    private String logo;
    private Integer cantidadProductos;
    private List<ProductoResumenResponse> productos;
}
