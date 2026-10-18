import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Aviso from '../components/Aviso'
import FormRegistro from '../components/usuarios/FormRegistro'
import { registrar } from '../services/usuariosService'

function RegistroView({ onLogin }) {
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  function crearCuenta(datos) {
    setError(null)
    setCargando(true)
    registrar(datos)
      .then((respuesta) => {
        onLogin(respuesta)
        navigate('/')
      })
      .catch((e) => {
        setError(e.message)
        setCargando(false)
      })
  }

  return (
    <FormRegistro onEnviar={crearCuenta} cargando={cargando}>
      <Aviso mensaje={error} onCerrar={() => setError(null)} />
    </FormRegistro>
  )
}

export default RegistroView