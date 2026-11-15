import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTurno } from '../../redux/turnoSlice'

export function useReserva(eleccion) {
  const dispatch = useDispatch()
  const [reservado, setReservado] = useState(null)

  function reservar(extra) {
    dispatch(createTurno({ ...eleccion.pedido, ...extra })).then((accion) => {
      if (accion.error) {
        if (accion.error.code === '409') eleccion.setHora(null)
        return
      }
      eleccion.setHora(null)
      setReservado(accion.payload)
    })
  }

  return { reservado, reservar, otro: () => setReservado(null) }
}
