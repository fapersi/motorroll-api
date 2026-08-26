package com.motorroll.motorroll_api.mapper;

import com.motorroll.motorroll_api.dto.orden.ItemOrdenResponse;
import com.motorroll.motorroll_api.dto.orden.OrdenResponse;
import com.motorroll.motorroll_api.model.ItemOrden;
import com.motorroll.motorroll_api.model.Orden;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrdenMapper {

    public OrdenResponse aResponse(Orden orden) {
        return OrdenResponse.builder()
                .id(orden.getId())
                .fecha(orden.getFecha())
                .estado(orden.getEstado())
                .comprador(orden.getComprador().getUsername())
                .items(orden.getItems().stream().map(this::aItemResponse).toList())
                .total(orden.getTotal())
                .build();
    }

    public List<OrdenResponse> aResponse(List<Orden> ordenes) {
        return ordenes.stream().map(this::aResponse).toList();
    }

    public ItemOrdenResponse aItemResponse(ItemOrden item) {
        return ItemOrdenResponse.builder()
                .productoId(item.getProducto().getId())
                .nombreProducto(item.getNombreProducto())
                .cantidad(item.getCantidad())
                .precioUnitario(item.getPrecioUnitario())
                .descuentoAplicado(item.getDescuentoAplicado())
                .subtotal(item.getSubtotal())
                .build();
    }
}
