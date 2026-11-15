package com.motorroll.motorroll_api.mapper;

import com.motorroll.motorroll_api.dto.producto.ProductoResumenResponse;
import com.motorroll.motorroll_api.dto.tienda.TiendaResponse;
import com.motorroll.motorroll_api.model.Tienda;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TiendaMapper {
    public TiendaResponse aResponse(Tienda tienda, int cantidadProductos, List<ProductoResumenResponse> productos) {
        String username = tienda.getVendedor().getUsername();

        return TiendaResponse.builder()
                .vendedor(username)
                .nombre(tienda.getNombre())
                .eslogan(tienda.getEslogan())
                .colorPrincipal(tienda.getColorPrincipal())
                .colorSecundario(tienda.getColorSecundario())
                .logo(tienda.tieneLogo() ? "/api/tiendas/" + username + "/logo?v=" + tienda.getLogoVersion() : null)
                .cantidadProductos(cantidadProductos)
                .productos(productos)
                .build();
    }
}
