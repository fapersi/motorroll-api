export function formatearPrecio(valor) {
  return Number(valor).toLocaleString('es-AR', { style: 'currency', currency: 'USD' })
}

export function formatearFecha(fecha) {
  return new Date(fecha).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })
}
