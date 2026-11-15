export function disponibilidad(agenda, bancoId, fecha, misTurnos) {
  const delBanco = agenda.ocupados.filter((ocupado) => ocupado.bancoId === bancoId)
  const cuantosEn = (dia) => delBanco.filter((ocupado) => ocupado.fecha === dia).length
  const esMio = (turno) =>
    turno.estado === 'CONFIRMADO' && turno.bancoId === bancoId && turno.fecha === fecha
  return {
    ocupadosDelDia: delBanco
      .filter((ocupado) => ocupado.fecha === fecha)
      .map((ocupado) => ocupado.hora),
    propiosDelDia: misTurnos.filter(esMio).map((turno) => turno.hora),
    diasLlenos: delBanco
      .map((ocupado) => ocupado.fecha)
      .filter((dia) => cuantosEn(dia) >= agenda.horarios.length),
  }
}
