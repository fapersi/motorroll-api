export function soloDigitos(texto) {
  return texto.replace(/[^0-9]/g, '')
}

export function bloquearSignos(e) {
  if (['-', '+', 'e', 'E', '.', ','].includes(e.key)) e.preventDefault()
}
