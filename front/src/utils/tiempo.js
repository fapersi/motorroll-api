const MINUTO = 60 * 1000
const HORA = 60 * MINUTO
const DIA = 24 * HORA

export function haceCuanto(fecha) {
  const pasado = Date.now() - new Date(fecha).getTime()
  if (pasado < MINUTO) return 'recién'
  if (pasado < HORA) return `hace ${Math.floor(pasado / MINUTO)} min`
  if (pasado < DIA) return `hace ${Math.floor(pasado / HORA)} h`
  const dias = Math.floor(pasado / DIA)
  return dias === 1 ? 'ayer' : `hace ${dias} días`
}

export function cuantoFalta(inicio) {
  const falta = inicio.getTime() - Date.now()
  const horas = Math.floor(falta / HORA)
  if (horas < 1) return 'Empieza en menos de una hora'
  if (horas === 1) return 'Te queda 1 hora'
  if (horas < 72) return `Te quedan ${horas} horas`
  return `Te quedan ${Math.floor(falta / DIA)} días`
}
