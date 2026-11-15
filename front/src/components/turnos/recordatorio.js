export const QUE_TRAER = [
  'Cédula verde del vehículo (física o digital)',
  'Seguro vigente',
  'Al menos medio tanque de combustible',
  'Neumáticos con la presión correcta',
]

const UNA_SEMANA = 7 * 24 * 60 * 60 * 1000

export function inicioDelTurno(turno) {
  return new Date(`${turno.fecha}T${turno.hora}:00`)
}

export function proximoTurno(turnos) {
  const ahora = Date.now()
  const proximos = turnos
    .filter((turno) => turno.estado === 'CONFIRMADO')
    .filter((turno) => inicioDelTurno(turno).getTime() > ahora)
    .filter((turno) => inicioDelTurno(turno).getTime() - ahora <= UNA_SEMANA)
    .sort((uno, otro) => inicioDelTurno(uno) - inicioDelTurno(otro))
  return proximos.length > 0 ? proximos[0] : null
}
