import { useState } from 'react'
import { Link } from 'react-router-dom'

function FormLogin({ onEnviar, cargando, children }) {
  const [datos, setDatos] = useState({ username: '', password: '' })
  const [incompleto, setIncompleto] = useState(false)

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
    <form className="formulario" onSubmit={enviar}>
      <h1 className="titulo-pagina">Ingresar</h1>
      {children}
      <label className="campo">
        Usuario
        <input name="username" value={datos.username} onChange={cambiar} />
      </label>
      <label className="campo">
        Contraseña
        <input
          type="password"
          name="password"
          value={datos.password}
          onChange={cambiar}
        />
      </label>
      {incompleto && <p className="campo-error">Completá usuario y contraseña</p>}
      <button className="boton" disabled={cargando}>
        {cargando ? 'Ingresando...' : 'Ingresar'}
      </button>
      <p>
        ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </form>
  )
}

export default FormLogin