import { useState } from 'react'
import { bloquearSignos, soloDigitos } from '../../utils/numeros'

function EditorNumero({ valor, maximo, onGuardar }) {
  const [numero, setNumero] = useState(String(valor))
  const fueraDeRango = maximo !== undefined && Number(numero) > maximo
  const sinCambios = numero === '' || Number(numero) === valor || fueraDeRango

  function enviar(e) {
    e.preventDefault()
    if (!sinCambios) onGuardar(Number(numero))
  }

  return (
    <form className="editor-numero" onSubmit={enviar} noValidate>
      <input
        type="number"
        min="0"
        max={maximo}
        value={numero}
        onKeyDown={bloquearSignos}
        onChange={(e) => setNumero(soloDigitos(e.target.value))}
      />
      <button className="boton boton-secundario" disabled={sinCambios}>
        Guardar
      </button>
    </form>
  )
}

export default EditorNumero
