import Estrellas from './Estrellas'

function ResumenResenas({ resumen }) {
  const maximo = Math.max(1, ...resumen.porEstrellas)

  return (
    <div className="resumen-resenas">
      <div className="resumen-promedio">
        <p className="resumen-numero">{resumen.promedio ? resumen.promedio.toFixed(1) : '—'}</p>
        <Estrellas valor={resumen.promedio || 0} tamanio="grande" />
        <p className="resumen-cantidad">
          {resumen.cantidad === 1 ? '1 opinión' : `${resumen.cantidad} opiniones`}
        </p>
      </div>
      <ul className="barras-estrellas">
        {resumen.porEstrellas.map((cantidad, i) => (
          <li key={5 - i}>
            <span>{5 - i} ★</span>
            <span className="barra">
              <span className="barra-relleno" style={{ width: `${(cantidad / maximo) * 100}%` }} />
            </span>
            <span className="barra-cantidad">{cantidad}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResumenResenas
