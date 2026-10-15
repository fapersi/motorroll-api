export function guardarSesion(respuesta) {
  localStorage.setItem('token', respuesta.token)
  localStorage.setItem('usuario', JSON.stringify(respuesta.usuario))
  localStorage.setItem('venceEn', Date.now() + respuesta.expiraEnMs)
}

export function obtenerToken() {
  return localStorage.getItem('token')
}

export function obtenerVencimiento() {
  return Number(localStorage.getItem('venceEn'))
}

export function obtenerUsuario() {
  const usuario = localStorage.getItem('usuario')
  if (!usuario) return null
  if (Date.now() > obtenerVencimiento()) {
    cerrarSesion()
    return null
  }
  return JSON.parse(usuario)
}

export function cerrarSesion() {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  localStorage.removeItem('venceEn')
}
