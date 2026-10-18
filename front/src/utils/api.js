import { obtenerToken, cerrarSesion } from './sesion'

export const URL_BASE = 'http://localhost:8080'

export function pedir(ruta, opciones = {}) {
  const token = obtenerToken()
  const esArchivo = opciones.body instanceof FormData
  const headers = {}

  if (token) headers.Authorization = `Bearer ${token}`
  if (opciones.body && !esArchivo) headers['Content-Type'] = 'application/json'

  return fetch(`${URL_BASE}${ruta}`, {
    method: opciones.method || 'GET',
    headers,
    body: esArchivo ? opciones.body : JSON.stringify(opciones.body),
  })
    .catch(() => {
      throw new Error('No se pudo conectar con el servidor.')
    })
    .then((respuesta) => {
      if (respuesta.status === 204) return null
      return respuesta.json().then((datos) => {
        if (respuesta.ok) return datos
        if (respuesta.status === 401 && token) {
          cerrarSesion()
          throw new Error('Tu sesión venció. Volvé a ingresar.')
        }
        throw new Error(mensajeDeError(datos))
      })
    })
}

function mensajeDeError(datos) {
  if (datos.errores) return Object.values(datos.errores).join('. ')
  return datos.mensaje
}

export function urlImagen(ruta) {
  if (!ruta) return null
  if (ruta.startsWith('http')) return ruta
  return `${URL_BASE}${ruta}`
}
