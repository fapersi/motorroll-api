import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Aviso from '../components/Aviso'
import FormLogin from '../components/usuarios/FormLogin'
import { login } from '../services/usuariosService'

function LoginView({ onLogin }) {
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function ingresar(datos) {
    setError('')
    setCargando(true)
    login(datos)
      .then((respuesta) => {
        onLogin(respuesta)
        navigate(location.state?.desde || '/')
      })
      .catch((e) => {
        setError(e.message)
        setCargando(false)
      })
  }

  return (
    <FormLogin onEnviar={ingresar} cargando={cargando}>
      <Aviso mensaje={location.state?.aviso} tipo="info" />
      <Aviso mensaje={error} onCerrar={() => setError('')} />
    </FormLogin>
  )
}

export default LoginView