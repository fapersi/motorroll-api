import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCarrito, limpiarError } from '../../redux/carritoSlice'
import { fetchPerfil } from '../../redux/usuarioSlice'
import { useLimpiarAlSalir } from '../../hooks/useLimpiarAlSalir'

export function useDatosCheckout() {
  const dispatch = useDispatch()
  const carrito = useSelector((state) => state.carrito)
  const { sesion, perfilCargado } = useSelector((state) => state.usuario)
  useLimpiarAlSalir(limpiarError)

  useEffect(() => {
    if (!perfilCargado) dispatch(fetchPerfil())
  }, [dispatch, perfilCargado])

  useEffect(() => {
    if (!carrito.cargado) dispatch(fetchCarrito())
  }, [dispatch, carrito.cargado])

  return { carrito, puntos: sesion ? sesion.puntos : 0 }
}
