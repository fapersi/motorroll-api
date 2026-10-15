import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import SoloRol from '../SoloRol'

function MenuUsuario({ usuario, onSalir }) {
  const [confirmando, setConfirmando] = useState(false)
  const navigate = useNavigate()

  if (!usuario) {
    return (
      <div className="menu-usuario">
        <Link to="/login" className="boton">
          Ingresar
        </Link>
        <Link to="/registro" className="boton boton-secundario">
          Registrarse
        </Link>
      </div>
    )
  }

  const salir = () => {
    setConfirmando(false)
    onSalir()
    navigate('/')
  }

  return (
    <div className="menu-usuario">
      <Link to="/perfil">Hola, {usuario.nombre}</Link>
      <span className="etiqueta-rol">{usuario.rol}</span>
      <SoloRol usuario={usuario} roles={['COMPRADOR']}>
        <Link to="/carrito" className="boton">
          🛒 Carrito
        </Link>
      </SoloRol>
      <button className="boton boton-secundario" onClick={() => setConfirmando(true)}>
        Salir
      </button>
      {confirmando && (
        <Modal titulo="¿Querés cerrar sesión?" onConfirmar={salir} onCancelar={() => setConfirmando(false)} />
      )}
    </div>
  )
}

export default MenuUsuario
