import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAgenda, fetchBancos, fetchMisTurnos } from '../../redux/turnoSlice'

export function useDatosTurnos() {
  const dispatch = useDispatch()
  const turnos = useSelector((state) => state.turnos)
  const faltaBancos = turnos.bancos === null
  const faltaAgenda = turnos.agenda === null
  const faltanTurnos = turnos.items === null

  useEffect(() => {
    if (faltaBancos) dispatch(fetchBancos())
  }, [dispatch, faltaBancos])

  useEffect(() => {
    if (faltaAgenda) dispatch(fetchAgenda())
  }, [dispatch, faltaAgenda])

  useEffect(() => {
    if (faltanTurnos) dispatch(fetchMisTurnos())
  }, [dispatch, faltanTurnos])

  return { ...turnos, listo: !faltaBancos && !faltaAgenda && !faltanTurnos }
}
