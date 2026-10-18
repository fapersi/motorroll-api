import { useState } from 'react'
import { Link } from 'react-router-dom'
import Campo from '../Campo'
import validarRegistro from './validarRegistro'

const INICIAL = {
  nombre: '',
  apellido: '',
  email: '',
  username: '',
  password: '',
  rol: 'COMPRADOR',
}

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
    onEnviar({
      ...datos,
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      email: datos.email.trim(),
      username: datos.username.trim(),
    })
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h1 className="titulo-pagina">Crear cuenta</h1>
      {children}
      <Campo etiqueta="Nombre" name="nombre" value={datos.nombre} onChange={cambiar} error={errores.nombre} />
      <Campo etiqueta="Apellido" name="apellido" value={datos.apellido} onChange={cambiar} error={errores.apellido} />
      <Campo etiqueta="Mail" name="email" value={datos.email} onChange={cambiar} error={errores.email} />
      <Campo etiqueta="Usuario" name="username" value={datos.username} onChange={cambiar} error={errores.username} />
      <Campo etiqueta="Contraseña" name="password" type="password" value={datos.password} onChange={cambiar} error={errores.password} />
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
