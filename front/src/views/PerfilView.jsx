import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aviso from '../components/Aviso'
import FormPerfil from '../components/usuarios/FormPerfil'
import { fetchPerfil, limpiarError, updatePerfil } from '../redux/usuarioSlice'

function PerfilView() {
  const dispatch = useDispatch()
  const { sesion, loading, error } = useSelector((state) => state.usuario)
  const [exito, setExito] = useState(null)

  useEffect(() => {
    dispatch(fetchPerfil())
  }, [dispatch])

  function guardar(perfil) {
    setExito(null)
    dispatch(updatePerfil(perfil)).then((accion) => {
      if (!accion.error) setExito('Datos actualizados')
    })
  }

  return (
    <FormPerfil usuario={sesion} onEnviar={guardar} cargando={loading}>
      <Aviso mensaje={exito} tipo="exito" onCerrar={() => setExito(null)} />
      <Aviso mensaje={error} onCerrar={() => dispatch(limpiarError())} />
    </FormPerfil>
  )
}

export default PerfilView
