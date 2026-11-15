import { useState } from 'react'
import Campo from '../Campo'
import VistaTarjeta from './VistaTarjeta'
import { formatearNumero, formatearVencimiento, TARJETA_VACIA, validarTarjeta } from './tarjeta'

const FORMATOS = { numero: formatearNumero, vencimiento: formatearVencimiento }

function FormTarjeta({ esCredito, textoBoton, procesando, onPagar }) {
  const [datos, setDatos] = useState(TARJETA_VACIA)
  const [errores, setErrores] = useState({})

  function cambiar(e) {
    const formato = FORMATOS[e.target.name]
    const valor = formato ? formato(e.target.value) : e.target.value
    setDatos({ ...datos, [e.target.name]: valor })
  }

  function enviar(e) {
    e.preventDefault()
    const encontrados = validarTarjeta(datos)
    setErrores(encontrados)
    if (Object.keys(encontrados).length === 0) onPagar()
  }

  return (
    <form className="form-tarjeta" onSubmit={enviar} noValidate>
      <VistaTarjeta datos={datos} esCredito={esCredito} />
      <Campo
        etiqueta="Número de tarjeta"
        name="numero"
        value={datos.numero}
        onChange={cambiar}
        error={errores.numero}
      />
      <Campo
        etiqueta="Nombre del titular"
        name="nombre"
        value={datos.nombre}
        onChange={cambiar}
        error={errores.nombre}
      />
      <div className="fila-campos">
        <Campo
          etiqueta="Vencimiento"
          name="vencimiento"
          value={datos.vencimiento}
          onChange={cambiar}
          error={errores.vencimiento}
        />
        <Campo
          etiqueta="Código"
          name="codigo"
          type="password"
          autoComplete="cc-csc"
          value={datos.codigo}
          onChange={cambiar}
          error={errores.codigo}
        />
      </div>
      <p className="nota-segura">
        🔒 Es una simulación: los datos de la tarjeta no se guardan ni se envían.
      </p>
      <button className="boton boton-grande" disabled={procesando}>
        {procesando ? 'Procesando el pago…' : textoBoton}
      </button>
    </form>
  )
}

export default FormTarjeta
