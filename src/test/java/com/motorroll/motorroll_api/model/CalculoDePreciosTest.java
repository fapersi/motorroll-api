package com.motorroll.motorroll_api.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Tests de la logica de precios y stock, que es la parte del negocio
 * de la que dependen el carrito y el checkout.
 */
class CalculoDePreciosTest {

    private Producto banco(String precio, int stock, int descuento) {
        return Producto.builder()
                .nombre("Banco de potencia inercial MR-1200")
                .precio(new BigDecimal(precio))
                .stock(stock)
                .descuento(descuento)
                .activo(true)
                .build();
    }

    @Test
    @DisplayName("Sin descuento el precio final es el precio de lista")
    void sinDescuentoElPrecioFinalEsElDeLista() {
        assertEquals(new BigDecimal("48500.00"), banco("48500.00", 3, 0).calcularPrecioFinal());
    }

    @Test
    @DisplayName("Con descuento el precio final lo aplica")
    void conDescuentoAplicaElPorcentaje() {
        assertEquals(new BigDecimal("29610.00"), banco("32900.00", 5, 10).calcularPrecioFinal());
        assertEquals(new BigDecimal("58320.00"), banco("72900.00", 2, 20).calcularPrecioFinal());
    }

    @Test
    @DisplayName("hayStockPara respeta las unidades disponibles")
    void hayStockParaRespetaLasUnidadesDisponibles() {
        Producto producto = banco("48500.00", 2, 0);

        assertTrue(producto.hayStockPara(1));
        assertTrue(producto.hayStockPara(2));
        assertFalse(producto.hayStockPara(3));
    }

    @Test
    @DisplayName("Un producto sin stock no se puede agregar al carrito")
    void productoSinStockNoSePuedeAgregar() {
        assertFalse(banco("245000.00", 0, 0).hayStockPara(1));
    }

    @Test
    @DisplayName("El total del carrito suma los subtotales con descuento aplicado")
    void elTotalDelCarritoSumaLosSubtotales() {
        Carrito carrito = Carrito.builder().build();

        Producto bancoInercial = banco("48500.00", 3, 0);
        Producto sonda = Producto.builder()
                .nombre("Sonda Lambda")
                .precio(new BigDecimal("690.00"))
                .stock(18)
                .descuento(5)
                .activo(true)
                .build();

        carrito.agregarItem(ItemCarrito.builder()
                .producto(bancoInercial)
                .cantidad(1)
                .precioUnitario(bancoInercial.getPrecio())
                .build());

        carrito.agregarItem(ItemCarrito.builder()
                .producto(sonda)
                .cantidad(3)
                .precioUnitario(sonda.getPrecio())
                .build());

        // 48500.00 + (655.50 x 3) = 50466.50
        assertEquals(new BigDecimal("50466.50"), carrito.calcularTotal());
    }
}
