import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function useLimpiarAlSalir(limpiar) {
  const dispatch = useDispatch()

  useEffect(() => () => dispatch(limpiar()), [dispatch, limpiar])
}
