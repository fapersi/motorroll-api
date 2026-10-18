import { useState } from 'react'
import { Link } from 'react-router-dom'
import Campo from '../Campo'
import { armarRegistro, INICIAL, validarRegistro } from './datosRegistro'

const CAMPOS = [
  { name: 'nombre', etiqueta: 'Nombre' },
  { name: 'apellido', etiqueta: 'Apellido' },
  { name: 'email', etiqueta: 'Mail' },
  { name: 'username', etiqueta: 'Usuario' },
  { name: 'password', etiqueta: 'Contraseña', type: 'password' },
]

function FormRegistro({ onEnviar, cargando, children }) {
  const [datos, setDatos] = useState(INICIAL)
  const [errores, setErrores] = useState({})

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()
    const encontrados = validarRegistro(datos)
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return
    onEnviar(armarRegistro(datos))
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h1 className="titulo-pagina">Crear cuenta</h1>
      {children}
      {CAMPOS.map((campo) => (
        <Campo
          key={campo.name}
          etiqueta={campo.etiqueta}
          name={campo.name}
          type={campo.type}
          value={datos[campo.name]}
          onChange={cambiar}
          error={errores[campo.name]}
        />
      ))}
      <label className="campo">
        Quiero
        <select name="rol" value={datos.rol} onChange={cambiar}>
          <option value="COMPRADOR">Comprar</option>
          <option value="VENDEDOR">Vender</option>
        </select>
      </label>
      <button className="boton" disabled={cargando}>
        {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
      <p>
        ¿Ya tenés cuenta? <Link to="/login">Ingresá</Link>
      </p>
    </form>
  )
}

export default FormRegistro
