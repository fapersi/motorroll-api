import Estrellas from './Estrellas'

function Calificacion({ promedio, cantidad }) {
  if (!cantidad) return <p className="calificacion calificacion-vacia">Sin opiniones todavía</p>

  return (
    <p className="calificacion">
      <span className="calificacion-numero">{promedio.toFixed(1)}</span>
      <Estrellas valor={promedio} tamanio="chico" />
      <span className="calificacion-cantidad">({cantidad})</span>
    </p>
  )
}

export default Calificacion
