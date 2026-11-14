import { useState } from 'react'
import { Link } from 'react-router-dom'

function FormLogin({ onEnviar, cargando, children }) {
  const [datos, setDatos] = useState({ username: '', password: '' })
  const [incompleto, setIncompleto] = useState(false)
  const [verClave, setVerClave] = useState(false)

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()
    const username = datos.username.trim()
    if (username === '' || datos.password === '') {
      setIncompleto(true)
      return
    }
    setIncompleto(false)
    onEnviar({ username, password: datos.password })
  }

  return (
    <form className="form-acceso" onSubmit={enviar}>
      {children}
      <label className="campo campo-icono">
        Usuario
        <span className="input-con-icono">
          <span aria-hidden="true">👤</span>
          <input
            name="username"
            autoComplete="username"
            placeholder="Tu usuario"
            value={datos.username}
            onChange={cambiar}
          />
        </span>
      </label>
      <label className="campo campo-icono">
        Contraseña
        <span className="input-con-icono">
          <span aria-hidden="true">🔑</span>
          <input
            type={verClave ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            placeholder="Tu contraseña"
            value={datos.password}
            onChange={cambiar}
          />
          <button type="button" className="ver-clave" onClick={() => setVerClave(!verClave)}>
            {verClave ? 'Ocultar' : 'Ver'}
          </button>
        </span>
      </label>
      {incompleto && <p className="campo-error">Completá usuario y contraseña</p>}
      <button className="boton boton-grande" disabled={cargando}>
        {cargando ? 'Ingresando...' : 'Ingresar'}
      </button>
      <p className="acceso-pie">
        ¿No tenés cuenta? <Link to="/registro">Creá una gratis</Link>
      </p>
    </form>
  )
}

export default FormLogin
