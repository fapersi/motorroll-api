import Calendario from './Calendario'
import FormTurno from './FormTurno'
import Horarios from './Horarios'
import { disponibilidad } from './disponibilidad'

function AgendaTurno({ agenda, misTurnos, eleccion, enviando, onReservar }) {
  const { banco, fecha } = eleccion
  const lugares = disponibilidad(agenda, banco.id, fecha, misTurnos)

  return (
    <div className="tarjeta turnos-agenda">
      <h2 className="paso">3. Día, horario y tus datos</h2>
      <Calendario
        elegida={fecha}
        diasDeAnticipacion={agenda.diasDeAnticipacion}
        diasLlenos={lugares.diasLlenos}
        feriados={agenda.feriados || []}
        onElegir={eleccion.elegirFecha}
      />
      {fecha && (
        <Horarios
          horarios={agenda.horarios}
          ocupados={lugares.ocupadosDelDia}
          propios={lugares.propiosDelDia}
          elegido={eleccion.hora}
          onElegir={eleccion.setHora}
        />
      )}
      <FormTurno eleccion={eleccion} enviando={enviando} onReservar={onReservar} />
    </div>
  )
}

export default AgendaTurno
