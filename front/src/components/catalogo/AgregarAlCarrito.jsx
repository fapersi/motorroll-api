import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Aviso from '../Aviso'
import SoloRol from '../SoloRol'
import { agregarAlCarrito } from '../../services/catalogoService'

function AgregarAlCarrito({ producto, usuario }) {
  const [agregado, setAgregado] = useState(null)
  const [error, setError] = useState(null)
  const location = useLocation()

  function agregar() {
    setError(null)
    agregarAlCarrito(producto.id)
      .then(() => setAgregado('Agregado al carrito'))
      .catch((e) => setError(e.message))
  }

  if (!producto.hayStock) {
    return (
      <button className="boton" disabled>
        Sin stock
      </button>
    )
  }

  if (!usuario) {
    return (
      <Link to="/login" state={{ desde: location.pathname }} className="boton">
        Ingresá para comprar
      </Link>
    )
  }

  return (
    <SoloRol usuario={usuario} roles={['COMPRADOR']}>
      <div className="agregar-carrito">
        <button className="boton" onClick={agregar}>
          Agregar al carrito
        </button>
        <Link to="/carrito" className="boton boton-secundario">
          Ver carrito
        </Link>
      </div>
      <Aviso mensaje={agregado} tipo="exito" onCerrar={() => setAgregado(null)} />
      <Aviso mensaje={error} onCerrar={() => setError(null)} />
    </SoloRol>
  )
}

export default AgregarAlCarrito
