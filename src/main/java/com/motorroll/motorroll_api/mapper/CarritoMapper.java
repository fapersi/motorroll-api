package com.motorroll.motorroll_api.mapper;

import com.motorroll.motorroll_api.dto.carrito.CarritoResponse;
import com.motorroll.motorroll_api.dto.carrito.ItemCarritoResponse;
import com.motorroll.motorroll_api.model.Carrito;
import com.motorroll.motorroll_api.model.ItemCarrito;
import com.motorroll.motorroll_api.model.Producto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CarritoMapper {

    private final ProductoMapper productoMapper;

    public CarritoResponse aResponse(Carrito carrito) {
        List<ItemCarritoResponse> items = carrito.getItems().stream()
                .map(this::aItemResponse)
                .toList();

        return CarritoResponse.builder()
                .id(carrito.getId())
                .estado(carrito.getEstado())
                .items(items)
                .cantidadDeItems(items.size())
                .total(carrito.calcularTotal())
                .build();
    }

    public ItemCarritoResponse aItemResponse(ItemCarrito item) {
        Producto producto = item.getProducto();

        return ItemCarritoResponse.builder()
                .id(item.getId())
                .productoId(producto.getId())
                .nombreProducto(producto.getNombre())
                .imagen(productoMapper.buscarPortada(producto))
                .cantidad(item.getCantidad())
                .precioUnitario(item.getPrecioUnitario())
                .precioUnitarioConDescuento(producto.calcularPrecioFinal())
                .descuento(producto.getDescuento())
                .subtotal(item.calcularSubtotal())
                .stockDisponible(producto.getStock())
                .hayStockSuficiente(producto.hayStockPara(item.getCantidad()))
                .build();
    }
}
