import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { checkout, limpiarError } from '../../redux/carritoSlice'
import { useLimpiarAlSalir } from '../../hooks/useLimpiarAlSalir'

export function usePago(pedido) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const error = useSelector((estado) => estado.carrito.errorPago)
  const [procesando, setProcesando] = useState(false)
  const temporizador = useRef(null)
  const montado = useRef(true)
  useLimpiarAlSalir(limpiarError)

  useEffect(() => {
    montado.current = true
    return () => {
      montado.current = false
      clearTimeout(temporizador.current)
    }
  }, [])

  function pagar() {
    dispatch(limpiarError())
    setProcesando(true)
    temporizador.current = setTimeout(() => {
      dispatch(checkout(pedido)).then((accion) => {
        if (!montado.current) return
        setProcesando(false)
        if (accion.error) return
        navigate(pathname, { replace: true, state: { ...state, orden: accion.payload } })
      })
    }, 1500)
  }

  return { procesando, error, cerrarError: () => dispatch(limpiarError()), pagar }
}
