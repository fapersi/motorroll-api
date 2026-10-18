import { useState } from 'react'

function EditorNumero({ valor, min, max, onGuardar }) {
  const [numero, setNumero] = useState(valor)
  const sinCambios = numero === '' || Number(numero) === valor

  function enviar(e) {
    e.preventDefault()
    onGuardar(Number(numero))
  }

  return (
    <form className="editor-numero" onSubmit={enviar}>
      <input type="number" min={min} max={max} value={numero} onChange={(e) => setNumero(e.target.value)} />
      <button className="boton boton-secundario" disabled={sinCambios}>
        Guardar
      </button>
    </form>
  )
}

export default EditorNumero
