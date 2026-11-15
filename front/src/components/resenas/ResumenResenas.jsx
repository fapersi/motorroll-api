import Estrellas from './Estrellas'

const ESTRELLAS = [5, 4, 3, 2, 1]

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
        {ESTRELLAS.map((estrellas) => {
          const cantidad = resumen.porEstrellas[5 - estrellas]
          return (
            <li key={estrellas}>
              <span>{estrellas} ★</span>
              <span className="barra">
                <span
                  className="barra-relleno"
                  style={{ width: `${(cantidad / maximo) * 100}%` }}
                />
              </span>
              <span className="barra-cantidad">{cantidad}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ResumenResenas
