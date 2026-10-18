import { pedir } from '../utils/api'

export function login(datos) {
  return pedir('/api/auth/login', { method: 'POST', body: datos })
}

export function registrar(datos) {
  return pedir('/api/auth/registro', { method: 'POST', body: datos })
}

export function obtenerPerfil() {
  return pedir('/api/usuarios/me')
}

export function actualizarPerfil(datos) {
  return pedir('/api/usuarios/me', { method: 'PUT', body: datos })
}

export function listarUsuarios() {
  return pedir('/api/usuarios')
}

export function cambiarRol(id, rol) {
  return pedir(`/api/usuarios/${id}/rol`, { method: 'PUT', body: { rol } })
}

export function cambiarEstado(id, activo) {
  return pedir(`/api/usuarios/${id}/estado`, { method: 'PUT', body: { activo } })
}

export function eliminarUsuario(id) {
  return pedir(`/api/usuarios/${id}`, { method: 'DELETE' })
}