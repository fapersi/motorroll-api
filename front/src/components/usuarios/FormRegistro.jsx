import { useState } from 'react'
import { Link } from 'react-router-dom'

const INICIAL = {
  nombre: '',
  apellido: '',
  email: '',
  username: '',
  password: '',
  rol: 'COMPRADOR',
}

function validar(d) {
  const errores = {}
  if (d.nombre.trim() === '') errores.nombre = 'El nombre es obligatorio'
  if (d.apellido.trim() === '') errores.apellido = 'El apellido es obligatorio'
  if (!d.email.includes('@')) errores.email = 'Ingresá un mail válido'
  if (d.username.trim().length < 4) errores.username = 'Mínimo 4 caracteres'
  if (d.password.length < 6) errores.password = 'Mínimo 6 caracteres'
  return errores
}

function Campo({ etiqueta, name, valor, onChange, error, tipo = 'text' }) {
  return (
    <label className="campo">
      {etiqueta}
      <input type={tipo} name={name} value={valor} onChange={onChange} />
      {error && <span className="campo-error">{error}</span>}
    </label>
  )
}

function FormRegistro({ onEnviar, cargando, children }) {
  const [datos, setDatos] = useState(INICIAL)
  const [errores, setErrores] = useState({})

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()
    const encontrados = validar(datos)
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
      <Campo etiqueta="Nombre" name="nombre" valor={datos.nombre} onChange={cambiar} error={errores.nombre} />
      <Campo etiqueta="Apellido" name="apellido" valor={datos.apellido} onChange={cambiar} error={errores.apellido} />
      <Campo etiqueta="Mail" name="email" valor={datos.email} onChange={cambiar} error={errores.email} />
      <Campo etiqueta="Usuario" name="username" valor={datos.username} onChange={cambiar} error={errores.username} />
      <Campo etiqueta="Contraseña" name="password" tipo="password" valor={datos.password} onChange={cambiar} error={errores.password} />
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