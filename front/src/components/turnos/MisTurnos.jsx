import { nombreVehiculo } from './vehiculos'
import { fechaLarga } from '../../utils/fechas'

function MisTurnos({ turnos, onCancelar }) {
  if (turnos.length === 0) return <p className="vacio">Todavía no reservaste turnos.</p>

  return (
    <ul className="mis-turnos">
      {turnos.map((turno) => (
        <li key={turno.id} className={turno.estado === 'CANCELADO' ? 'turno cancelado' : 'turno'}>
          <div>
            <strong>{turno.banco}</strong>
            <p>
              {fechaLarga(turno.fecha)} · {turno.hora} hs · {nombreVehiculo(turno.vehiculo)}{' '}
              {turno.modeloVehiculo}
            </p>
          </div>
          {turno.estado === 'CONFIRMADO' ? (
            <button
              className="boton boton-secundario boton-chico"
              onClick={() => onCancelar(turno)}
            >
              Cancelar
            </button>
          ) : (
            <span className="etiqueta-cancelado">Cancelado</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default MisTurnos
