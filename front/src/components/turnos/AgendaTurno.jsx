import Calendario from './Calendario'
import FormTurno from './FormTurno'
import Horarios from './Horarios'
import { disponibilidad } from './disponibilidad'

function AgendaTurno({ agenda, eleccion, enviando, onReservar }) {
  const { ocupadosDelDia, diasLlenos } = disponibilidad(agenda, eleccion.banco.id, eleccion.fecha)

  return (
    <div className="tarjeta turnos-agenda">
      <h2 className="paso">Día, horario y tus datos</h2>
      <Calendario
        elegida={eleccion.fecha}
        diasDeAnticipacion={agenda.diasDeAnticipacion}
        diasLlenos={diasLlenos}
        onElegir={eleccion.elegirFecha}
      />
      {eleccion.fecha && (
        <Horarios
          horarios={agenda.horarios}
          ocupados={ocupadosDelDia}
          elegido={eleccion.hora}
          onElegir={eleccion.setHora}
        />
      )}
      <FormTurno eleccion={eleccion} enviando={enviando} onReservar={onReservar} />
    </div>
  )
}

export default AgendaTurno
