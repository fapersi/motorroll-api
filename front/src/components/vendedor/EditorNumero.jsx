import { useState } from 'react'

function EditorNumero({ valor, onGuardar }) {
  const [numero, setNumero] = useState(valor)
  const sinCambios = numero === '' || Number(numero) === valor

  function enviar(e) {
    e.preventDefault()
    onGuardar(Number(numero))
  }

  return (
    <form className="editor-numero" onSubmit={enviar} noValidate>
      <input type="number" min="0" value={numero} onChange={(e) => setNumero(e.target.value)} />
      <button className="boton boton-secundario" disabled={sinCambios}>
        Guardar
      </button>
    </form>
  )
}

export default EditorNumero
