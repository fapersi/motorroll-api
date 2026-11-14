import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCarrito, selectUnidades } from '../../redux/carritoSlice'

function BotonCarrito() {
  const dispatch = useDispatch()
  const cargado = useSelector((state) => state.carrito.cargado)
  const unidades = useSelector(selectUnidades)
  const texto = unidades === 1 ? '1 producto en el carrito' : `${unidades} productos en el carrito`

  useEffect(() => {
    if (!cargado) dispatch(fetchCarrito())
  }, [dispatch, cargado])

  return (
    <Link to="/carrito" className="boton-carrito" aria-label={texto} title={texto}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.5L21 8H6.2" />
        <circle cx="10" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
      </svg>
      {unidades > 0 && (
        <span key={unidades} className="contador-carrito">
          {unidades > 99 ? '99+' : unidades}
        </span>
      )}
    </Link>
  )
}

export default BotonCarrito
