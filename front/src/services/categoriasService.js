import { pedir } from '../utils/api'

export function listarCategorias() {
  return pedir('/api/categorias')
}

export function guardarCategoria(id, datos) {
  if (id) return pedir(`/api/categorias/${id}`, { method: 'PUT', body: datos })
  return pedir('/api/categorias', { method: 'POST', body: datos })
}

export function borrarCategoria(id) {
  return pedir(`/api/categorias/${id}`, { method: 'DELETE' })
}
