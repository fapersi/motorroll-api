export const DIAS_SEMANA = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

export function claveDia(fecha) {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${fecha.getFullYear()}-${mes}-${dia}`
}

export function hoy() {
  const ahora = new Date()
  return new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate())
}

export function sumarDias(fecha, dias) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + dias)
}

export function diasDelMes(primerDia) {
  const huecos = (primerDia.getDay() + 6) % 7
  const total = new Date(primerDia.getFullYear(), primerDia.getMonth() + 1, 0).getDate()
  const vacios = Array.from({ length: huecos }, () => null)
  const dias = Array.from({ length: total }, (_, i) => sumarDias(primerDia, i))
  return [...vacios, ...dias]
}

export function esReservable(fecha, diasDeAnticipacion) {
  const finDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6
  return !finDeSemana && fecha > hoy() && fecha <= sumarDias(hoy(), diasDeAnticipacion)
}

export function nombreDelMes(fecha) {
  return fecha.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
}

export function fechaLarga(clave) {
  const [anio, mes, dia] = clave.split('-').map(Number)
  const fecha = new Date(anio, mes - 1, dia)
  return fecha.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })
}
