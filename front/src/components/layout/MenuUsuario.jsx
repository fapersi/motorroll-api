import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import { cerrarSesion } from '../../redux/usuarioSlice'

const NOMBRE_ROL = { COMPRADOR: 'Comprador', VENDEDOR: 'Vendedor', ADMIN: 'Admin' }

function MenuUsuario({ usuario, onNavegar }) {
  const dispatch = useDispatch()
  const [confirmando, setConfirmando] = useState(false)
  const navigate = useNavigate()

  if (!usuario) {
    return (
      <div className="menu-usuario">
        <Link to="/login" className="boton" onClick={onNavegar}>
          Ingresar
        </Link>
        <Link to="/registro" className="boton boton-secundario" onClick={onNavegar}>
          Registrarse
        </Link>
      </div>
    )
  }

  const salir = () => {
    setConfirmando(false)
    onNavegar()
    dispatch(cerrarSesion())
    navigate('/')
  }

  return (
    <div className="menu-usuario">
      <Link to="/perfil" onClick={onNavegar}>
        Hola, {usuario.nombre}
      </Link>
      <span className="etiqueta-rol">{NOMBRE_ROL[usuario.rol]}</span>
      <button className="boton boton-secundario" onClick={() => setConfirmando(true)}>
        Salir
      </button>
      {confirmando && (
        <Modal
          titulo="¿Querés cerrar sesión?"
          textoConfirmar="Cerrar sesión"
          onConfirmar={salir}
          onCancelar={() => setConfirmando(false)}
        />
      )}
    </div>
  )
}

export default MenuUsuario
