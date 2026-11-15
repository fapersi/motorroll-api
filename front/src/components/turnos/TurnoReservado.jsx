import { useEffect, useRef } from 'react'
import TicketTurno from './TicketTurno'

function TurnoReservado({ turno, onOtro }) {
  const tarjeta = useRef(null)

  useEffect(() => {
    tarjeta.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <div className="tarjeta turnos-agenda turno-reservado" ref={tarjeta}>
      <div className="tilde" aria-hidden="true">
        ✓
      </div>
      <h2>¡Turno reservado!</h2>
      <p>Te esperamos en el taller. Te dejamos el aviso en la campanita y también lo ves abajo.</p>
      <TicketTurno
        banco={turno.banco}
        fecha={turno.fecha}
        hora={turno.hora}
        vehiculo={turno.vehiculo}
        modelo={turno.modeloVehiculo}
        cotizarVtv={turno.cotizarVtv}
      />
      <button className="boton boton-grande" onClick={onOtro}>
        Reservar otro turno
      </button>
    </div>
  )
}

export default TurnoReservado
