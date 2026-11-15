import axios from 'axios'
import { borrarSesion, obtenerToken } from './sesion'

export const URL_BASE = 'http://localhost:8080'
export const SESION_VENCIDA = 'Tu sesión venció. Volvé a ingresar.'

export const api = axios.create({ baseURL: URL_BASE })

api.interceptors.request.use((config) => {
  const token = obtenerToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const falla = new Error(mensajeDeError(error))
    falla.code = error.response ? String(error.response.status) : 'SIN_RED'
    return Promise.reject(falla)
  },
)

function mensajeDeError(error) {
  if (!error.response) return 'No se pudo conectar con el servidor.'
  if (error.response.status === 401 && obtenerToken()) {
    borrarSesion()
    return SESION_VENCIDA
  }
  const datos = error.response.data || {}
  if (datos.errores) return Object.values(datos.errores).join('. ')
  return datos.mensaje || 'Algo salió mal. Probá de nuevo en unos segundos.'
}

export function urlImagen(ruta) {
  if (!ruta) return null
  if (ruta.startsWith('http')) return ruta
  return `${URL_BASE}${ruta}`
}
