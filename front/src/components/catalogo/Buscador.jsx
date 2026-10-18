import { useState } from 'react'

function Buscador({ texto, onBuscar }) {
  const [valor, setValor] = useState(texto)

  function enviar(e) {
    e.preventDefault()
    onBuscar(valor.trim())
  }

  return (
    <form className="buscador" onSubmit={enviar}>
      <input
        type="search"
        placeholder="Buscar por nombre o descripción"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <button className="boton">Buscar</button>
    </form>
  )
}

export default Buscador
