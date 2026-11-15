export function colorDeTexto(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luz = (r * 299 + g * 587 + b * 114) / 1000
  return luz > 150 ? '#111317' : '#ffffff'
}

export function estiloDeMarca(tienda) {
  return {
    '--marca-1': tienda.colorPrincipal,
    '--marca-2': tienda.colorSecundario,
    '--marca-texto': colorDeTexto(tienda.colorPrincipal),
  }
}

export function iniciales(nombre) {
  return nombre
    .split(' ')
    .filter((palabra) => palabra !== '')
    .slice(0, 2)
    .map((palabra) => palabra[0].toUpperCase())
    .join('')
}
