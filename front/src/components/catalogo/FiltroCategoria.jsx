import { useState } from 'react'
import ListaCategorias from './ListaCategorias'

function resumen(elegidas, categorias) {
  if (elegidas.length === 0) return 'Todas'
  if (elegidas.length > 1) return `${elegidas.length} categorías`
  const elegida = categorias.find((categoria) => categoria.id === elegidas[0])
  return elegida ? elegida.nombre : 'Todas'
}

function FiltroCategoria({ elegidas, categorias, onCambiar }) {
  const [abierto, setAbierto] = useState(false)
  const texto = resumen(elegidas, categorias)

  function cerrarSiSale(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) setAbierto(false)
  }

  return (
    <div
      className="filtro filtro-categorias"
      onBlur={cerrarSiSale}
      onKeyDown={(e) => e.key === 'Escape' && setAbierto(false)}
    >
      Categorías
      <button
        type="button"
        className={elegidas.length > 0 ? 'selector-multiple activo' : 'selector-multiple'}
        aria-expanded={abierto}
        aria-label={`Categorías: ${texto}`}
        onClick={() => setAbierto(!abierto)}
      >
        <span>{texto}</span>
        <span aria-hidden="true">▾</span>
      </button>
      {abierto && (
        <ListaCategorias elegidas={elegidas} categorias={categorias} onCambiar={onCambiar} />
      )}
    </div>
  )
}

export default FiltroCategoria
