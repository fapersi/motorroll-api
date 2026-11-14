import { Link } from 'react-router-dom'

function EstadoPago({ orden }) {
  if (!orden) {
    return (
      <div className="estado-pago">
        <div className="cargando-rueda" />
        <h2>Procesando el pago…</h2>
        <p>No cierres esta pantalla.</p>
      </div>
    )
  }

  return (
    <div className="estado-pago aprobado">
      <div className="tilde">✓</div>
      <h2>¡Pago aprobado!</h2>
      <p>Tu número de orden es #{orden.id}.</p>
      <p className="puntos-ganados">Sumaste {orden.puntosGanados} Motorroll Puntos</p>
      <Link to="/ordenes" className="boton">
        Ver mis órdenes
      </Link>
    </div>
  )
}

export default EstadoPago
