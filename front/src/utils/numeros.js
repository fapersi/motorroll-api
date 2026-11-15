export function soloDigitos(texto) {
  return texto.replace(/[^0-9]/g, '')
}

export function bloquearSignosDecimales(e) {
  if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault()
}

export function normalizarDecimal(texto) {
  const limpio = String(texto).trim()
  if (limpio.includes(',')) return limpio.replace(/\./g, '').replace(',', '.')
  if (/^\d{1,3}(\.\d{3})+$/.test(limpio)) return limpio.replace(/\./g, '')
  return limpio
}

export function esPrecioValido(texto) {
  const normalizado = normalizarDecimal(texto)
  return /^\d+(\.\d{1,2})?$/.test(normalizado) && Number(normalizado) > 0
}

export function bloquearSignos(e) {
  if (['-', '+', 'e', 'E', '.', ','].includes(e.key)) e.preventDefault()
}
