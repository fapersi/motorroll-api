import { useState } from 'react'

function FiltroPrecio({ minimo, maximo, onAplicar }) {
  const [rango, setRango] = useState({ precioMin: minimo, precioMax: maximo })
  const [error, setError] = useState(null)

  function cambiar(e) {
    setRango({ ...rango, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()
    const hayDosPrecios = rango.precioMin !== '' && rango.precioMax !== ''
    if (hayDosPrecios && Number(rango.precioMin) > Number(rango.precioMax)) {
      setError('El mínimo no puede ser mayor que el máximo')
      return
    }
    setError(null)
    onAplicar(rango.precioMin, rango.precioMax)
  }

  return (
    <form className="filtro" onSubmit={enviar} noValidate>
      Precio (US$)
      <div className="filtro-precio">
        <input
          type="number"
          name="precioMin"
          aria-label="Precio desde"
          min="0"
          placeholder="Desde"
          value={rango.precioMin}
          onChange={cambiar}
        />
        <input
          type="number"
          name="precioMax"
          aria-label="Precio hasta"
          min="0"
          placeholder="Hasta"
          value={rango.precioMax}
          onChange={cambiar}
        />
        <button className="boton boton-secundario">Aplicar</button>
      </div>
      {error && <span className="campo-error">{error}</span>}
    </form>
  )
}

export default FiltroPrecio
