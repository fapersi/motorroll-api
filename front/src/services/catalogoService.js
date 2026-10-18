import { pedir } from '../utils/api'

export function buscarProductos(filtros) {
  const parametros = new URLSearchParams()
  if (filtros.texto) parametros.append('texto', filtros.texto)
  if (filtros.categoriaId) parametros.append('categoriaId', filtros.categoriaId)
  if (filtros.precioMin) parametros.append('precioMin', filtros.precioMin)
  if (filtros.precioMax) parametros.append('precioMax', filtros.precioMax)
  if (filtros.ordenarPor) parametros.append('ordenarPor', filtros.ordenarPor)
  const consulta = parametros.toString()
  return pedir(consulta ? `/api/productos?${consulta}` : '/api/productos')
}

export function obtenerProducto(id) {
  return pedir(`/api/productos/${id}`)
}

export function agregarAlCarrito(productoId) {
  return pedir('/api/carrito/items', { method: 'POST', body: { productoId, cantidad: 1 } })
}

export function misPublicaciones() {
  return pedir('/api/productos/mis-publicaciones')
}

function subirFoto(productoId, foto) {
  const formulario = new FormData()
  formulario.append('imagen', foto)
  return pedir(`/api/productos/${productoId}/imagenes`, { method: 'POST', body: formulario })
}

export function agregarFotos(producto, fotos) {
  const subidas = fotos.map((foto) => subirFoto(producto.id, foto))
  return Promise.all(subidas).then((nuevas) => ({
    ...producto,
    imagenes: [...producto.imagenes, ...nuevas],
  }))
}

export function guardarProducto(id, datos, fotos) {
  const pedido = id
    ? pedir(`/api/productos/${id}`, { method: 'PUT', body: datos })
    : pedir('/api/productos', { method: 'POST', body: datos })
  return pedido.then((producto) => agregarFotos(producto, fotos))
}

export function cambiarStock(producto, stock) {
  return pedir(`/api/productos/${producto.id}/stock`, { method: 'PATCH', body: { stock } })
}

export function cambiarDescuento(producto, descuento) {
  return pedir(`/api/productos/${producto.id}/descuento`, { method: 'PATCH', body: { descuento } })
}

export function darDeBaja(producto) {
  const dadoDeBaja = { ...producto, activo: false }
  return pedir(`/api/productos/${producto.id}`, { method: 'DELETE' }).then(() => dadoDeBaja)
}
