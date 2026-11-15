export function temaGuardado() {
  return localStorage.getItem('tema') || 'oscuro'
}

export function guardarTema(tema) {
  localStorage.setItem('tema', tema)
}
