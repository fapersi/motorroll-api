import { useState } from 'react'

const TEXTOS = ['', 'Malo', 'Regular', 'Bueno', 'Muy bueno', 'Excelente']

function ElegirEstrellas({ valor, onElegir }) {
  const [encima, setEncima] = useState(null)
  const mostrado = encima === null ? valor : encima

  return (
    <div className="elegir-estrellas" onMouseLeave={() => setEncima(null)}>
      {[1, 2, 3, 4, 5].map((numero) => (
        <button
          key={numero}
          type="button"
          className={numero <= mostrado ? 'estrella-boton activa' : 'estrella-boton'}
          aria-label={`${numero} estrellas`}
          onMouseEnter={() => setEncima(numero)}
          onClick={() => onElegir(numero)}
        >
          ★
        </button>
      ))}
      <span className="elegir-estrellas-texto">{TEXTOS[mostrado]}</span>
    </div>
  )
}

export default ElegirEstrellas
