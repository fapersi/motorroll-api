import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Aviso from '../Aviso'
import { addItem, limpiarError } from '../../redux/carritoSlice'
import { useLimpiarAlSalir } from '../../hooks/useLimpiarAlSalir'

function AgregarAlCarrito({ producto }) {
  const dispatch = useDispatch()
  const usuario = useSelector((state) => state.usuario.sesion)
  const { error, loading } = useSelector((state) => state.carrito)
  const [agregado, setAgregado] = useState(null)
  const location = useLocation()
  useLimpiarAlSalir(limpiarError)

  function agregar() {
    setAgregado(null)
    dispatch(addItem(producto.id)).then((accion) => {
      if (!accion.error) setAgregado('Agregado al carrito')
    })
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

  if (usuario.rol !== 'COMPRADOR') return null

  return (
    <>
      <div className="agregar-carrito">
        <button className="boton" disabled={loading} onClick={agregar}>
          {loading ? 'Agregando…' : 'Agregar al carrito'}
        </button>
        <Link to="/carrito" className="boton boton-secundario">
          Ver carrito
        </Link>
      </div>
      <Aviso mensaje={agregado} tipo="exito" onCerrar={() => setAgregado(null)} />
      <Aviso mensaje={error} onCerrar={() => dispatch(limpiarError())} />
    </>
  )
}

export default AgregarAlCarrito
