function validarRegistro(datos) {
  const errores = {}
  if (datos.nombre.trim() === '') errores.nombre = 'El nombre es obligatorio'
  if (datos.apellido.trim() === '') errores.apellido = 'El apellido es obligatorio'
  if (!datos.email.includes('@')) errores.email = 'Ingresá un mail válido'
  if (datos.username.trim().length < 4) errores.username = 'Mínimo 4 caracteres'
  if (datos.password.length < 6) errores.password = 'Mínimo 6 caracteres'
  return errores
}

export default validarRegistro
