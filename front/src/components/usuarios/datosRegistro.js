export const INICIAL = {
  nombre: '',
  apellido: '',
  email: '',
  username: '',
  password: '',
  rol: 'COMPRADOR',
}

export function validarRegistro(datos) {
  const errores = {}
  if (datos.nombre.trim() === '') errores.nombre = 'El nombre es obligatorio'
  if (datos.apellido.trim() === '') errores.apellido = 'El apellido es obligatorio'
  if (!datos.email.includes('@')) errores.email = 'Ingresá un mail válido'
  if (datos.username.trim().length < 4) errores.username = 'Mínimo 4 caracteres'
  if (datos.password.length < 6) errores.password = 'Mínimo 6 caracteres'
  return errores
}

export function armarRegistro(datos) {
  return {
    ...datos,
    nombre: datos.nombre.trim(),
    apellido: datos.apellido.trim(),
    email: datos.email.trim(),
    username: datos.username.trim(),
  }
}
