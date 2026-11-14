import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function RutaPrivada({ roles, children }) {
  const usuario = useSelector((state) => state.usuario.sesion)
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" state={{ desde: location.pathname }} />
  }

  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/sin-permiso" />
  }

  return children
}

export default RutaPrivada
