import { useDispatch } from 'react-redux'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import AgendaTurno from '../components/turnos/AgendaTurno'
import GarajeBancos from '../components/turnos/GarajeBancos'
import MisTurnos from '../components/turnos/MisTurnos'
import SelectorVehiculo from '../components/turnos/SelectorVehiculo'
import TurnoReservado from '../components/turnos/TurnoReservado'
import { useDatosTurnos } from '../components/turnos/useDatosTurnos'
import { useEleccionTurno } from '../components/turnos/useEleccionTurno'
import { useReserva } from '../components/turnos/useReserva'
import { limpiarError } from '../redux/turnoSlice'
import { useLimpiarAlSalir } from '../hooks/useLimpiarAlSalir'

function TurnosView() {
  const dispatch = useDispatch()
  const datos = useDatosTurnos()
  const eleccion = useEleccionTurno(datos.bancos)
  const reserva = useReserva(eleccion)
  useLimpiarAlSalir(limpiarError)

  if (!datos.listo) return datos.error ? <Aviso mensaje={datos.error} /> : <Cargando />
  if (!eleccion.banco) return <p className="vacio">No hay bancos para probar.</p>

  return (
    <section className="turnos">
      <h1 className="titulo-pagina">Probá un banco en el taller</h1>
      <Aviso mensaje={datos.error} flotante onCerrar={() => dispatch(limpiarError())} />
      <h2 className="paso">1. ¿Con qué venís?</h2>
      <SelectorVehiculo
        vehiculo={eleccion.vehiculo}
        bancos={datos.bancos}
        onElegir={eleccion.elegirVehiculo}
      />
      <div className="turnos-columnas">
        <div className="tarjeta turnos-garaje">
          <h2 className="paso">2. ¿Qué dinamómetro querés probar?</h2>
          <GarajeBancos
            bancos={datos.bancos}
            bancoId={eleccion.banco.id}
            vehiculo={eleccion.vehiculo}
            onElegir={eleccion.elegirBanco}
          />
        </div>
        {reserva.reservado ? (
          <TurnoReservado turno={reserva.reservado} onOtro={reserva.otro} />
        ) : (
          <AgendaTurno
            agenda={datos.agenda}
            misTurnos={datos.items}
            eleccion={eleccion}
            enviando={datos.loading}
            onReservar={reserva.reservar}
          />
        )}
      </div>
      <h2 className="paso">Mis turnos</h2>
      <MisTurnos turnos={datos.items} ocupado={datos.loading} />
    </section>
  )
}

export default TurnosView
