export function disponibilidad(agenda, bancoId, fecha) {
  const delBanco = agenda.ocupados.filter((o) => o.bancoId === bancoId)
  const cuantosEn = (dia) => delBanco.filter((o) => o.fecha === dia).length
  return {
    ocupadosDelDia: delBanco.filter((o) => o.fecha === fecha).map((o) => o.hora),
    diasLlenos: delBanco
      .map((o) => o.fecha)
      .filter((dia) => cuantosEn(dia) >= agenda.horarios.length),
  }
}
