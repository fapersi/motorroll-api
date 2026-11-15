const LADO = 21

function esEsquina(fila, columna) {
  const enBorde = (valor) => valor < 7 || valor >= LADO - 7
  return enBorde(fila) && enBorde(columna) && !(fila >= LADO - 7 && columna >= LADO - 7)
}

function pintado(fila, columna, semilla) {
  if (esEsquina(fila, columna)) {
    const filaDelCuadro = fila % (LADO - 7)
    const columnaDelCuadro = columna % (LADO - 7)
    const enFila = (valor) => filaDelCuadro === valor
    const enColumna = (valor) => columnaDelCuadro === valor
    const anillo = enFila(0) || enFila(6) || enColumna(0) || enColumna(6)
    const centro =
      filaDelCuadro >= 2 && filaDelCuadro <= 4 && columnaDelCuadro >= 2 && columnaDelCuadro <= 4
    return anillo || centro
  }
  return (fila * 31 + columna * 17 + semilla) % 7 < 3
}

function CodigoQR({ semilla }) {
  const celdas = Array.from({ length: LADO * LADO }, (_, numero) => numero)
  const llenas = celdas.filter((celda) => pintado(Math.floor(celda / LADO), celda % LADO, semilla))

  return (
    <svg
      className="codigo-qr"
      viewBox={`-1 -1 ${LADO + 2} ${LADO + 2}`}
      role="img"
      aria-label="Código QR de pago"
    >
      <rect x="-1" y="-1" width={LADO + 2} height={LADO + 2} fill="#fff" />
      {llenas.map((celda) => (
        <rect
          key={celda}
          x={celda % LADO}
          y={Math.floor(celda / LADO)}
          width="1"
          height="1"
          fill="#111"
        />
      ))}
    </svg>
  )
}

export default CodigoQR
