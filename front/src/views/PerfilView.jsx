import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aviso from '../components/Aviso'
import FormPerfil from '../components/usuarios/FormPerfil'
import { fetchPerfil, limpiarError, updatePerfil } from '../redux/usuarioSlice'
import { useLimpiarAlSalir } from '../hooks/useLimpiarAlSalir'

function PerfilView() {
  const dispatch = useDispatch()
  const { sesion, perfilCargado, loading, error } = useSelector((state) => state.usuario)
  const [exito, setExito] = useState(null)
  useLimpiarAlSalir(limpiarError)

  useEffect(() => {
    if (!perfilCargado) dispatch(fetchPerfil())
  }, [dispatch, perfilCargado])

  function guardar(perfil) {
    setExito(null)
    dispatch(updatePerfil(perfil)).then((accion) => {
      if (!accion.error) setExito('Datos actualizados')
    })
  }

  return (
    <FormPerfil
      key={`${sesion.nombre}|${sesion.apellido}|${sesion.email}`}
      usuario={sesion}
      onEnviar={guardar}
      cargando={loading && perfilCargado}
    >
      <Aviso mensaje={exito} tipo="exito" onCerrar={() => setExito(null)} />
      <Aviso mensaje={error} onCerrar={() => dispatch(limpiarError())} />
    </FormPerfil>
  )
}

export default PerfilView
