package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.carrito.AgregarItemRequest;
import com.motorroll.motorroll_api.dto.carrito.CarritoResponse;
import com.motorroll.motorroll_api.dto.orden.OrdenResponse;

public interface CarritoService {
    CarritoResponse verCarrito(String username);

    CarritoResponse agregarItem(String username, AgregarItemRequest request);

    CarritoResponse actualizarCantidad(String username, Long itemId, Integer cantidad);

    CarritoResponse eliminarItem(String username, Long itemId);

    CarritoResponse vaciar(String username);

    OrdenResponse checkout(String username);
}
