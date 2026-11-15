import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Aviso from '../components/Aviso'
import FormRegistro from '../components/usuarios/FormRegistro'
import PantallaAcceso from '../components/usuarios/PantallaAcceso'
import { limpiarError, registrar } from '../redux/usuarioSlice'
import { useLimpiarAlSalir } from '../hooks/useLimpiarAlSalir'

function RegistroView() {
  const dispatch = useDispatch()
  const { sesion, loading, error } = useSelector((state) => state.usuario)
  const location = useLocation()
  useLimpiarAlSalir(limpiarError)

  if (sesion) return <Navigate to={location.state?.desde || '/'} replace />

  return (
    <PantallaAcceso titulo="Crear cuenta" bajada="Comprá o publicá equipamiento en minutos.">
      <FormRegistro onEnviar={(nuevo) => dispatch(registrar(nuevo))} cargando={loading}>
        <Aviso mensaje={location.state?.aviso} tipo="info" />
        <Aviso mensaje={error} onCerrar={() => dispatch(limpiarError())} />
      </FormRegistro>
    </PantallaAcceso>
  )
}

export default RegistroView
