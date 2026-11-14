const LADO = 21

function esEsquina(fila, columna) {
  const enBorde = (valor) => valor < 7 || valor >= LADO - 7
  return enBorde(fila) && enBorde(columna) && !(fila >= LADO - 7 && columna >= LADO - 7)
}

function pintado(fila, columna, semilla) {
  if (esEsquina(fila, columna)) {
    const f = fila % (LADO - 7)
    const c = columna % (LADO - 7)
    const anillo = f === 0 || f === 6 || c === 0 || c === 6
    const centro = f >= 2 && f <= 4 && c >= 2 && c <= 4
    return anillo || centro
  }
  return (fila * 31 + columna * 17 + semilla) % 7 < 3
}

function CodigoQR({ semilla }) {
  const celdas = Array.from({ length: LADO * LADO }, (_, i) => i)
  const llenas = celdas.filter((i) => pintado(Math.floor(i / LADO), i % LADO, semilla))

  return (
    <svg
      className="codigo-qr"
      viewBox={`-1 -1 ${LADO + 2} ${LADO + 2}`}
      aria-label="Código QR de pago"
    >
      <rect x="-1" y="-1" width={LADO + 2} height={LADO + 2} fill="#fff" />
      {llenas.map((i) => (
        <rect key={i} x={i % LADO} y={Math.floor(i / LADO)} width="1" height="1" fill="#111" />
      ))}
    </svg>
  )
}

export default CodigoQR
