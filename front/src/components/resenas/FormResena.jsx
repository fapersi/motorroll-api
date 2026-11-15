import { useState } from 'react'
import Aviso from '../Aviso'
import ElegirEstrellas from './ElegirEstrellas'

function FormResena({ onEnviar, enviando, error, onCerrarError }) {
  const [estrellas, setEstrellas] = useState(0)
  const [comentario, setComentario] = useState('')
  const [incompleto, setIncompleto] = useState(null)

  function enviar(e) {
    e.preventDefault()
    if (estrellas === 0) return setIncompleto('Elegí cuántas estrellas le das')
    if (comentario.trim() === '') return setIncompleto('Contanos qué te pareció')
    setIncompleto(null)
    onEnviar({ estrellas, comentario: comentario.trim() })
  }

  return (
    <form className="form-resena" onSubmit={enviar}>
      <h3>¿Qué te pareció este producto?</h3>
      <ElegirEstrellas valor={estrellas} onElegir={setEstrellas} />
      <textarea
        rows="3"
        aria-label="Tu opinión"
        maxLength="1000"
        placeholder="Contá tu experiencia con el equipo"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />
      {incompleto && <p className="campo-error">{incompleto}</p>}
      <Aviso mensaje={error} onCerrar={onCerrarError} />
      <button className="boton" disabled={enviando}>
        {enviando ? 'Publicando…' : 'Publicar opinión'}
      </button>
    </form>
  )
}

export default FormResena
