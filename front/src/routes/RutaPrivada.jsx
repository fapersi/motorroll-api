import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function RutaPrivada({ roles, children }) {
  const usuario = useSelector((state) => state.usuario.sesion)
  const location = useLocation()

  if (!usuario) {
    const aviso = 'Ingresá o creá tu cuenta gratis para seguir.'
    return <Navigate to="/login" state={{ desde: location.pathname, aviso }} replace />
  }

  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/sin-permiso" replace />
  }

  return children
}

export default RutaPrivada
