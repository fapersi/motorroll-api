import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import AgendaTurno from '../components/turnos/AgendaTurno'
import GarajeBancos from '../components/turnos/GarajeBancos'
import MisTurnos from '../components/turnos/MisTurnos'
import SelectorVehiculo from '../components/turnos/SelectorVehiculo'
import { useDatosTurnos } from '../components/turnos/useDatosTurnos'
import { useEleccionTurno } from '../components/turnos/useEleccionTurno'
import { cancelTurno, createTurno, limpiarError } from '../redux/turnoSlice'
import { fechaLarga } from '../utils/fechas'

function TurnosView() {
  const dispatch = useDispatch()
  const datos = useDatosTurnos()
  const eleccion = useEleccionTurno(datos.bancos)
  const [exito, setExito] = useState(null)

  if (!datos.listo) return datos.error ? <Aviso mensaje={datos.error} /> : <Cargando />
  if (!eleccion.banco) return <p className="vacio">No hay bancos para probar.</p>

  function reservar(extra) {
    dispatch(createTurno({ ...eleccion.pedido, ...extra })).then((accion) => {
      if (accion.error) return
      const turno = accion.payload
      eleccion.setHora(null)
      setExito(`¡Listo! Te esperamos el ${fechaLarga(turno.fecha)} a las ${turno.hora} hs.`)
    })
  }

  return (
    <section className="turnos">
      <h1 className="titulo-pagina">Probá un banco en el taller</h1>
      <Aviso mensaje={exito} tipo="exito" onCerrar={() => setExito(null)} />
      <Aviso mensaje={datos.error} onCerrar={() => dispatch(limpiarError())} />
      <h2 className="paso">¿Con qué venís?</h2>
      <SelectorVehiculo
        vehiculo={eleccion.vehiculo}
        bancos={datos.bancos}
        onElegir={eleccion.elegirVehiculo}
      />
      <div className="turnos-columnas">
        <AgendaTurno
          agenda={datos.agenda}
          eleccion={eleccion}
          enviando={datos.loading}
          onReservar={reservar}
        />
        <div className="tarjeta turnos-garaje">
          <h2 className="paso">¿Qué dinamómetro querés probar?</h2>
          <GarajeBancos
            bancos={datos.bancos}
            bancoId={eleccion.banco.id}
            vehiculo={eleccion.vehiculo}
            onElegir={eleccion.elegirBanco}
          />
        </div>
      </div>
      <h2 className="paso">Mis turnos</h2>
      <MisTurnos turnos={datos.items} onCancelar={(turno) => dispatch(cancelTurno(turno.id))} />
    </section>
  )
}

export default TurnosView
