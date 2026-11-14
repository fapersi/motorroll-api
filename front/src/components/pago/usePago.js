import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkout, limpiarError } from '../../redux/carritoSlice'

export function usePago(pedido) {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.carrito.error)
  const [procesando, setProcesando] = useState(false)
  const [orden, setOrden] = useState(null)

  function pagar() {
    dispatch(limpiarError())
    setProcesando(true)
    setTimeout(() => {
      dispatch(checkout(pedido)).then((accion) => {
        if (accion.error) setProcesando(false)
        else setOrden(accion.payload)
      })
    }, 1500)
  }

  return { procesando, orden, error, cerrarError: () => dispatch(limpiarError()), pagar }
}
