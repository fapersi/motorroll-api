function BarraStat({ nombre, valor, maximo, unidad }) {
  const porcentaje = valor ? Math.min(100, (valor / maximo) * 100) : 0

  return (
    <div className="barra-stat">
      <div className="barra-stat-texto">
        <span>{nombre}</span>
        <strong>{valor ? `${valor} ${unidad}` : '—'}</strong>
      </div>
      <div className="barra-stat-pista">
        <span className="barra-stat-relleno" style={{ width: `${porcentaje}%` }} />
      </div>
    </div>
  )
}

export default BarraStat
