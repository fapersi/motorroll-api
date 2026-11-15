import { nombreVehiculo } from './vehiculos'
import { fechaLarga } from '../../utils/fechas'

function TicketTurno({ banco, fecha, hora, vehiculo, modelo, cotizarVtv }) {
  return (
    <div className="ticket-turno">
      <p>
        <span>Banco</span>
        <strong>{banco}</strong>
      </p>
      <p>
        <span>Día</span>
        <strong>{fecha ? fechaLarga(fecha) : 'Elegí en el calendario'}</strong>
      </p>
      <p>
        <span>Horario</span>
        <strong>{hora ? `${hora} hs` : '—'}</strong>
      </p>
      <p>
        <span>Vehículo</span>
        <strong>
          {nombreVehiculo(vehiculo)} {modelo}
        </strong>
      </p>
      {cotizarVtv && (
        <p>
          <span>VTV</span>
          <strong>Te la cotizamos en el taller</strong>
        </p>
      )}
    </div>
  )
}

export default TicketTurno
