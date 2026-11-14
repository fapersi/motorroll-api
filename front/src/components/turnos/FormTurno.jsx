import { useState } from 'react'
import { nombreVehiculo } from './vehiculos'
import { fechaLarga } from '../../utils/fechas'

function FormTurno({ eleccion, enviando, onReservar }) {
  const { banco, bloqueado, vehiculo, fecha, hora } = eleccion
  const [modelo, setModelo] = useState('')
  const [comentario, setComentario] = useState('')
  const [falta, setFalta] = useState(null)

  function enviar(e) {
    e.preventDefault()
    if (bloqueado) return setFalta('Elegí un banco que admita tu vehículo')
    if (!fecha || !hora) return setFalta('Elegí el día y el horario')
    if (modelo.trim() === '') return setFalta('Contanos la marca y el modelo')
    setFalta(null)
    onReservar({ modeloVehiculo: modelo.trim(), comentario: comentario.trim() })
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
      <div className="ticket-turno">
        <p>
          <span>Banco</span>
          <strong>{banco.nombre}</strong>
        </p>
        <p>
          <span>Día</span>
          <strong>{fecha ? fechaLarga(fecha) : 'Elegí en el calendario'}</strong>
        </p>
        <p>
          <span>Horario</span>
          <strong>{hora || '—'}</strong>
        </p>
      </div>
      {falta && <p className="campo-error">{falta}</p>}
      <button className="boton boton-grande" disabled={enviando}>
        {enviando ? 'Reservando…' : 'Confirmar turno'}
      </button>
    </form>
  )
}

export default FormTurno
