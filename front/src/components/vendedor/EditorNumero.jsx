import { useState } from 'react'
import { bloquearSignos, soloDigitos } from '../../utils/numeros'

function EditorNumero({ valor, maximo = null, etiqueta, onGuardar }) {
  const [numero, setNumero] = useState(String(valor))
  const [guardando, setGuardando] = useState(false)
  const fueraDeRango = maximo !== null && Number(numero) > maximo
  const noSePuedeGuardar = numero === '' || Number(numero) === valor || fueraDeRango

  function enviar(e) {
    e.preventDefault()
    if (noSePuedeGuardar || guardando) return
    setGuardando(true)
    onGuardar(Number(numero)).finally(() => setGuardando(false))
  }

  return (
    <form className="editor-numero" onSubmit={enviar} noValidate>
      <input
        type="number"
        aria-label={etiqueta}
        min="0"
        max={maximo === null ? undefined : maximo}
        value={numero}
        onKeyDown={bloquearSignos}
        onChange={(e) => setNumero(soloDigitos(e.target.value))}
      />
      <button className="boton boton-secundario" disabled={noSePuedeGuardar || guardando}>
        {guardando ? 'Guardando…' : 'Guardar'}
      </button>
    </form>
  )
}

export default EditorNumero
