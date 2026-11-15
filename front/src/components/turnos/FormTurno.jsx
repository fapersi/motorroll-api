import { useState } from 'react'
import TicketTurno from './TicketTurno'
import { nombreVehiculo } from './vehiculos'

function FormTurno({ eleccion, enviando, onReservar }) {
  const { banco, bloqueado, vehiculo, fecha, hora } = eleccion
  const [modelo, setModelo] = useState('')
  const [comentario, setComentario] = useState('')
  const [cotizarVtv, setCotizarVtv] = useState(false)
  const [falta, setFalta] = useState(null)

  function enviar(e) {
    e.preventDefault()
    if (bloqueado) return setFalta('Elegí un banco que admita tu vehículo')
    if (!fecha || !hora) return setFalta('Elegí el día y el horario')
    if (modelo.trim() === '') return setFalta('Contanos la marca y el modelo')
    setFalta(null)
    onReservar({ modeloVehiculo: modelo.trim(), comentario: comentario.trim(), cotizarVtv })
  }

  return (
    <form className="form-turno" onSubmit={enviar} noValidate>
      <label className="campo">
        Marca y modelo de tu {nombreVehiculo(vehiculo)}
        <input
          value={modelo}
          maxLength="80"
          placeholder="Ej: Honda TRX 420"
          onChange={(e) => setModelo(e.target.value)}
        />
      </label>
      <label className="campo">
        Comentario (opcional)
        <textarea
          rows="2"
          maxLength="300"
          value={comentario}
          placeholder="Qué querés medir, preparación del motor, etc."
          onChange={(e) => setComentario(e.target.value)}
        />
      </label>
      <label className="opcion-vtv">
        <input
          type="checkbox"
          checked={cotizarVtv}
          onChange={(e) => setCotizarVtv(e.target.checked)}
        />
        <span>
          <strong>Mi VTV no está al día</strong>
          Te la cotizamos en el taller el día del turno.
        </span>
      </label>
      <TicketTurno
        banco={banco.nombre}
        fecha={fecha}
        hora={hora}
        vehiculo={vehiculo}
        modelo={modelo}
      />
      {falta && <p className="campo-error">{falta}</p>}
      <button className="boton boton-grande" disabled={enviando}>
        {enviando ? 'Un momento…' : 'Confirmar turno'}
      </button>
    </form>
  )
}

export default FormTurno
