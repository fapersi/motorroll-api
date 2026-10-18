import { useState } from 'react'
import FotoProducto from './FotoProducto'

function Galeria({ imagenes, nombre }) {
  const [actual, setActual] = useState(0)

  if (imagenes.length === 0) {
    return (
      <div className="galeria-principal">
        <FotoProducto nombre={nombre} />
      </div>
    )
  }

  return (
    <div>
      <div className="galeria-principal">
        <FotoProducto ruta={imagenes[actual].url} nombre={nombre} />
      </div>
      {imagenes.length > 1 && (
        <div className="galeria-miniaturas">
          {imagenes.map((imagen, posicion) => (
            <button
              key={imagen.id}
              className={posicion === actual ? 'miniatura activa' : 'miniatura'}
              onClick={() => setActual(posicion)}
            >
              <FotoProducto ruta={imagen.url} nombre={`${nombre} ${posicion + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Galeria
