package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.dto.carrito.AgregarItemRequest;
import com.motorroll.motorroll_api.dto.carrito.CarritoResponse;
import com.motorroll.motorroll_api.dto.orden.OrdenResponse;
import com.motorroll.motorroll_api.exception.OperacionNoPermitidaException;
import com.motorroll.motorroll_api.exception.RecursoNoEncontradoException;
import com.motorroll.motorroll_api.exception.ReglaDeNegocioException;
import com.motorroll.motorroll_api.mapper.CarritoMapper;
import com.motorroll.motorroll_api.mapper.OrdenMapper;
import com.motorroll.motorroll_api.model.Carrito;
import com.motorroll.motorroll_api.model.EstadoCarrito;
import com.motorroll.motorroll_api.model.EstadoOrden;
import com.motorroll.motorroll_api.model.ItemCarrito;
import com.motorroll.motorroll_api.model.ItemOrden;
import com.motorroll.motorroll_api.model.Orden;
import com.motorroll.motorroll_api.model.Producto;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.CarritoRepository;
import com.motorroll.motorroll_api.repository.OrdenRepository;
import com.motorroll.motorroll_api.repository.ProductoRepository;
import com.motorroll.motorroll_api.service.CarritoService;
import com.motorroll.motorroll_api.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Carrito de compras y checkout.
 *
 * Cada comprador tiene un unico carrito ABIERTO. Al confirmar la compra se revalida
 * el stock item por item, recien ahi se descuenta, y el carrito pasa a CONFIRMADO.
 */
@Service
@RequiredArgsConstructor
public class CarritoServiceImpl implements CarritoService {

    private final CarritoRepository carritoRepository;
    private final ProductoRepository productoRepository;
    private final OrdenRepository ordenRepository;
    private final UsuarioService usuarioService;
    private final CarritoMapper carritoMapper;
    private final OrdenMapper ordenMapper;

    @Override
    @Transactional
    public CarritoResponse verCarrito(String username) {
        return carritoMapper.aResponse(obtenerOCrearCarrito(username));
    }

    @Override
    @Transactional
    public CarritoResponse agregarItem(String username, AgregarItemRequest request) {
        Carrito carrito = obtenerOCrearCarrito(username);

        Producto producto = productoRepository.findByIdAndActivoTrue(request.getProductoId())
                .orElseThrow(() -> new RecursoNoEncontradoException("el producto", request.getProductoId()));

        // Requisito del enunciado: si el producto no tiene stock no se puede agregar al carrito.
        if (!producto.hayStockPara(1)) {
            throw new ReglaDeNegocioException(
                    "El producto " + producto.getNombre() + " esta sin stock. Consultar disponibilidad");
        }

        ItemCarrito itemExistente = buscarItemPorProducto(carrito, producto.getId());
        int cantidadFinal = request.getCantidad() + (itemExistente != null ? itemExistente.getCantidad() : 0);

        validarStock(producto, cantidadFinal);

        if (itemExistente != null) {
            itemExistente.setCantidad(cantidadFinal);
        } else {
            carrito.agregarItem(ItemCarrito.builder()
                    .producto(producto)
                    .cantidad(request.getCantidad())
                    .precioUnitario(producto.getPrecio())
                    .build());
        }

        return carritoMapper.aResponse(carritoRepository.save(carrito));
    }

    @Override
    @Transactional
    public CarritoResponse actualizarCantidad(String username, Long itemId, Integer cantidad) {
        Carrito carrito = obtenerOCrearCarrito(username);
        ItemCarrito item = buscarItem(carrito, itemId);

        validarStock(item.getProducto(), cantidad);
        item.setCantidad(cantidad);

        return carritoMapper.aResponse(carritoRepository.save(carrito));
    }

    @Override
    @Transactional
    public CarritoResponse eliminarItem(String username, Long itemId) {
        Carrito carrito = obtenerOCrearCarrito(username);
        ItemCarrito item = buscarItem(carrito, itemId);

        // orphanRemoval = true hace que al sacarlo de la lista se borre de la tabla.
        carrito.getItems().remove(item);

        return carritoMapper.aResponse(carritoRepository.save(carrito));
    }

    @Override
    @Transactional
    public CarritoResponse vaciar(String username) {
        Carrito carrito = obtenerOCrearCarrito(username);
        carrito.getItems().clear();

        return carritoMapper.aResponse(carritoRepository.save(carrito));
    }

    @Override
    @Transactional
    public OrdenResponse checkout(String username) {
        Usuario comprador = usuarioService.buscarEntidadPorUsername(username);
        Carrito carrito = obtenerOCrearCarrito(username);

        if (carrito.getItems().isEmpty()) {
            throw new ReglaDeNegocioException("El carrito esta vacio, no hay nada para comprar");
        }

        Orden orden = Orden.builder()
                .comprador(comprador)
                .estado(EstadoOrden.CONFIRMADA)
                .build();

        BigDecimal total = BigDecimal.ZERO;
        List<Producto> productosAActualizar = new ArrayList<>();

        for (ItemCarrito item : carrito.getItems()) {
            Producto producto = item.getProducto();

            if (!producto.isActivo()) {
                throw new ReglaDeNegocioException(
                        "La publicacion " + producto.getNombre() + " ya no esta disponible. Sacala del carrito para continuar");
            }

            // Se revalida el stock recien al confirmar: otro comprador se pudo haber adelantado.
            validarStock(producto, item.getCantidad());

            BigDecimal precioUnitario = producto.calcularPrecioFinal();
            BigDecimal subtotal = precioUnitario.multiply(BigDecimal.valueOf(item.getCantidad()));

            orden.agregarItem(ItemOrden.builder()
                    .producto(producto)
                    .nombreProducto(producto.getNombre())
                    .cantidad(item.getCantidad())
                    .precioUnitario(precioUnitario)
                    .descuentoAplicado(producto.getDescuento())
                    .subtotal(subtotal)
                    .build());

            total = total.add(subtotal);

            producto.setStock(producto.getStock() - item.getCantidad());
            productosAActualizar.add(producto);
        }

        orden.setTotal(total);
        ordenRepository.save(orden);
        productoRepository.saveAll(productosAActualizar);

        // El carrito usado queda cerrado; en el proximo pedido se crea uno nuevo vacio.
        carrito.setEstado(EstadoCarrito.CONFIRMADO);
        carritoRepository.save(carrito);

        return ordenMapper.aResponse(orden);
    }

    // ------------------------------------------------------------------
    // Auxiliares
    // ------------------------------------------------------------------

    private Carrito obtenerOCrearCarrito(String username) {
        Usuario comprador = usuarioService.buscarEntidadPorUsername(username);

        return carritoRepository.findByCompradorIdAndEstado(comprador.getId(), EstadoCarrito.ABIERTO)
                .orElseGet(() -> carritoRepository.save(Carrito.builder()
                        .comprador(comprador)
                        .estado(EstadoCarrito.ABIERTO)
                        .build()));
    }

    private void validarStock(Producto producto, int cantidad) {
        if (!producto.hayStockPara(cantidad)) {
            throw new ReglaDeNegocioException("No hay stock suficiente de " + producto.getNombre()
                    + ". Disponible: " + producto.getStock() + ", pediste: " + cantidad);
        }
    }

    private ItemCarrito buscarItem(Carrito carrito, Long itemId) {
        return carrito.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new OperacionNoPermitidaException(
                        "El item " + itemId + " no pertenece a tu carrito"));
    }

    private ItemCarrito buscarItemPorProducto(Carrito carrito, Long productoId) {
        return carrito.getItems().stream()
                .filter(item -> item.getProducto().getId().equals(productoId))
                .findFirst()
                .orElse(null);
    }
}
