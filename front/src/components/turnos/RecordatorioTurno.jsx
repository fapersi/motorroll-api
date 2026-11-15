import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Icono from '../Icono'
import { QUE_TRAER, inicioDelTurno, proximoTurno } from './recordatorio'
import { fetchMisTurnos } from '../../redux/turnoSlice'
import { fechaLarga } from '../../utils/fechas'
import { cuantoFalta } from '../../utils/tiempo'

function RecordatorioTurno() {
  const dispatch = useDispatch()
  const turnos = useSelector((state) => state.turnos.items)
  const { pathname } = useLocation()
  const [cerrado, setCerrado] = useState(false)
  const enInicio = pathname === '/'

  useEffect(() => {
    if (turnos === null && enInicio) dispatch(fetchMisTurnos())
  }, [dispatch, turnos, enInicio])

  const turno = turnos === null ? null : proximoTurno(turnos)
  if (cerrado || !enInicio || turno === null) return null

  return (
    <aside className="recordatorio" aria-labelledby="titulo-recordatorio">
      <button
        type="button"
        className="aviso-cerrar"
        aria-label="Cerrar recordatorio"
        onClick={() => setCerrado(true)}
      >
        ✕
      </button>
      <p className="recordatorio-falta">
        <Icono nombre="reloj" />
        {cuantoFalta(inicioDelTurno(turno))}
      </p>
      <h2 id="titulo-recordatorio">Tu turno para probar el {turno.banco}</h2>
      <p className="recordatorio-cuando">
        {fechaLarga(turno.fecha)} a las {turno.hora}
      </p>
      <p className="recordatorio-subtitulo">Qué traer</p>
      <ul className="lista-traer">
        {QUE_TRAER.map((cosa) => (
          <li key={cosa}>{cosa}</li>
        ))}
      </ul>
      <p className="recordatorio-vtv">
        {turno.cotizarVtv
          ? 'Pediste que te coticemos la VTV: traé el último certificado, aunque esté vencido.'
          : 'Traé la VTV vigente. Si no la tenés al día, avisanos y te la cotizamos.'}
      </p>
      <Link to="/turnos" className="boton boton-chico" onClick={() => setCerrado(true)}>
        Ver mis turnos
      </Link>
    </aside>
  )
}

export default RecordatorioTurno
