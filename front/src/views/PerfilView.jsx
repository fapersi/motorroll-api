import { useEffect, useState } from 'react'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import FormPerfil from '../components/usuarios/FormPerfil'
import { actualizarPerfil, obtenerPerfil } from '../services/usuariosService'

function PerfilView({ onLogin }) {
  const [perfil, setPerfil] = useState(null)
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    obtenerPerfil()
      .then(setPerfil)
      .catch((e) => setError(e.message))
  }, [])

  function guardar(datos) {
    setError('')
    setExito('')
    setCargando(true)
    actualizarPerfil(datos)
      .then((respuesta) => {
        onLogin(respuesta)
        setPerfil(respuesta.usuario)
        setExito('Datos actualizados')
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false))
  }

  if (!perfil) return error ? <Aviso mensaje={error} /> : <Cargando />

  return (
    <FormPerfil usuario={perfil} onEnviar={guardar} cargando={cargando}>
      <Aviso mensaje={exito} tipo="exito" onCerrar={() => setExito('')} />
      <Aviso mensaje={error} onCerrar={() => setError('')} />
    </FormPerfil>
  )
}

export default PerfilView