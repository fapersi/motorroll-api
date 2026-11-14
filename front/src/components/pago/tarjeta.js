export const TARJETA_VACIA = { numero: '', nombre: '', vencimiento: '', codigo: '' }

export function formatearNumero(texto) {
  const digitos = texto.replace(/\D/g, '').slice(0, 16)
  return digitos.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export function formatearVencimiento(texto) {
  const digitos = texto.replace(/\D/g, '').slice(0, 4)
  return digitos.length > 2 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos
}

function vencida(vencimiento) {
  const [mes, anio] = vencimiento.split('/').map(Number)
  const hoy = new Date()
  const anioActual = hoy.getFullYear() % 100
  return anio < anioActual || (anio === anioActual && mes < hoy.getMonth() + 1)
}

export function validarTarjeta(datos) {
  const errores = {}
  const mes = Number(datos.vencimiento.slice(0, 2))
  if (datos.numero.replace(/\s/g, '').length !== 16) errores.numero = 'Tiene que tener 16 dígitos'
  if (datos.nombre.trim().length < 3) errores.nombre = 'Escribí el nombre como figura en la tarjeta'
  if (datos.vencimiento.length !== 5 || mes < 1 || mes > 12)
    errores.vencimiento = 'Usá el formato MM/AA'
  else if (vencida(datos.vencimiento)) errores.vencimiento = 'La tarjeta está vencida'
  if (!/^\d{3,4}$/.test(datos.codigo)) errores.codigo = 'Son 3 o 4 números'
  return errores
}
