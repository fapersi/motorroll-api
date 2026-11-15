import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CampoClave from './CampoClave'
import Icono from '../Icono'

function FormLogin({ onEnviar, cargando, children }) {
  const [datos, setDatos] = useState({ username: '', password: '' })
  const [incompleto, setIncompleto] = useState(false)
  const location = useLocation()

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
          <Icono nombre="usuario" />
          <input
            name="username"
            autoComplete="username"
            placeholder="Tu usuario"
            value={datos.username}
            onChange={cambiar}
          />
        </span>
      </label>
      <CampoClave valor={datos.password} onCambiar={cambiar} />
      {incompleto && <p className="campo-error">Completá usuario y contraseña</p>}
      <button className="boton boton-grande" disabled={cargando}>
        {cargando ? 'Ingresando...' : 'Ingresar'}
      </button>
      <p className="acceso-pie">
        ¿No tenés cuenta?{' '}
        <Link to="/registro" state={location.state}>
          Creá una gratis
        </Link>
      </p>
    </form>
  )
}

export default FormLogin
