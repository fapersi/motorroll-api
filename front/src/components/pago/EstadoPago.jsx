import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const TITULOS = {
  TRANSFERENCIA: '¡Compra registrada!',
  EFECTIVO: '¡Cupón generado!',
  BILLETERA_VIRTUAL: '¡Pago con QR registrado!',
}

const SIGUE = {
  TRANSFERENCIA: 'Cuando se acredite la transferencia, el vendedor prepara el envío.',
  EFECTIVO: 'Pagá el cupón en cualquier caja dentro de los próximos 3 días.',
  BILLETERA_VIRTUAL: 'El vendedor ya está preparando el envío.',
}

function EstadoPago({ orden }) {
  const titulo = useRef(null)

  useEffect(() => {
    if (orden && titulo.current) titulo.current.focus()
  }, [orden])

  if (!orden) {
    return (
      <div className="estado-pago" role="status">
        <div className="cargando-rueda" />
        <h2>Procesando el pago…</h2>
        <p>No cierres esta pantalla.</p>
      </div>
    )
  }

  return (
    <div className="estado-pago aprobado" role="status">
      <div className="tilde">✓</div>
      <h2 ref={titulo} tabIndex={-1}>
        {TITULOS[orden.metodoPago] || '¡Pago aprobado!'}
      </h2>
      <p>Tu número de orden es #{orden.id}.</p>
      <p>{SIGUE[orden.metodoPago] || 'El vendedor ya está preparando el envío.'}</p>
      <p className="puntos-ganados">Sumaste {orden.puntosGanados} Motorroll Puntos</p>
      <p>Te dejamos el detalle en la campanita y en tu mail.</p>
      <div className="estado-pago-botones">
        <Link to="/ordenes" className="boton">
          Ver mis órdenes
        </Link>
        <Link to="/" className="boton boton-secundario">
          Seguir comprando
        </Link>
      </div>
    </div>
  )
}

export default EstadoPago
