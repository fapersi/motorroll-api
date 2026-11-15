import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '../Modal'
import { nombreVehiculo } from './vehiculos'
import { cancelTurno } from '../../redux/turnoSlice'
import { claveDia, fechaLarga, hoy } from '../../utils/fechas'

function MisTurnos({ turnos, ocupado }) {
  const dispatch = useDispatch()
  const [aCancelar, setACancelar] = useState(null)
  const hoyClave = claveDia(hoy())

  if (turnos.length === 0) return <p className="vacio">Todavía no reservaste turnos.</p>

  function cancelar() {
    dispatch(cancelTurno(aCancelar.id))
    setACancelar(null)
  }

  return (
    <>
      <ul className="mis-turnos">
        {turnos.map((turno) => (
          <li key={turno.id} className={turno.estado === 'CANCELADO' ? 'turno cancelado' : 'turno'}>
            <div>
              <strong>{turno.banco}</strong>
              <p>
                {fechaLarga(turno.fecha)} · {turno.hora} · {nombreVehiculo(turno.vehiculo)}{' '}
                {turno.modeloVehiculo}
              </p>
              {turno.cotizarVtv && <span className="etiqueta-vtv">Cotizar VTV</span>}
            </div>
            {turno.estado === 'CONFIRMADO' && turno.fecha <= hoyClave && (
              <span className="etiqueta-cancelado">Ya pasó</span>
            )}
            {turno.estado === 'CONFIRMADO' && turno.fecha > hoyClave && (
              <button
                className="boton boton-secundario boton-chico"
                disabled={ocupado}
                onClick={() => setACancelar(turno)}
              >
                Cancelar
              </button>
            )}
            {turno.estado !== 'CONFIRMADO' && <span className="etiqueta-cancelado">Cancelado</span>}
          </li>
        ))}
      </ul>
      {aCancelar && (
        <Modal
          titulo="¿Cancelar este turno?"
          texto={`${aCancelar.banco} · ${fechaLarga(aCancelar.fecha)} a las ${aCancelar.hora}`}
          textoCancelar="Volver"
          textoConfirmar="Sí, cancelar"
          onConfirmar={cancelar}
          onCancelar={() => setACancelar(null)}
        />
      )}
    </>
  )
}

export default MisTurnos
