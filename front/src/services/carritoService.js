import { pedir } from '../utils/api'

export function verCarrito() {
  return pedir('/api/carrito')
}

export function cambiarCantidad(itemId, cantidad) {
  return pedir(`/api/carrito/items/${itemId}`, { method: 'PUT', body: { cantidad } })
}

export function quitarItem(itemId) {
  return pedir(`/api/carrito/items/${itemId}`, { method: 'DELETE' })
}

export function vaciarCarrito() {
  return pedir('/api/carrito', { method: 'DELETE' })
}

export function confirmarCompra() {
  return pedir('/api/carrito/checkout', { method: 'POST' })
}

export function misOrdenes() {
  return pedir('/api/ordenes')
}
