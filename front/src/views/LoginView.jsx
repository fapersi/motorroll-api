import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Aviso from '../components/Aviso'
import FormLogin from '../components/usuarios/FormLogin'
import PantallaAcceso from '../components/usuarios/PantallaAcceso'
import { limpiarError, login } from '../redux/usuarioSlice'
import { useLimpiarAlSalir } from '../hooks/useLimpiarAlSalir'

function LoginView() {
  const dispatch = useDispatch()
  const { sesion, loading, error } = useSelector((state) => state.usuario)
  const location = useLocation()
  useLimpiarAlSalir(limpiarError)

  if (sesion) return <Navigate to={location.state?.desde || '/'} replace />

  return (
    <PantallaAcceso
      titulo="Ingresá a tu cuenta"
      bajada="Ingresá para comprar, reservar turnos y ver tus órdenes."
    >
      <FormLogin onEnviar={(credenciales) => dispatch(login(credenciales))} cargando={loading}>
        <Aviso mensaje={location.state?.aviso} tipo="info" />
        <Aviso mensaje={error} onCerrar={() => dispatch(limpiarError())} />
      </FormLogin>
    </PantallaAcceso>
  )
}

export default LoginView
