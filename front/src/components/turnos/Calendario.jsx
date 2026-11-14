import { useState } from 'react'
import DiasDelMes from './DiasDelMes'
import { hoy, nombreDelMes, sumarDias } from '../../utils/fechas'

function primeroDelMes(fecha, corrimiento = 0) {
  return new Date(fecha.getFullYear(), fecha.getMonth() + corrimiento, 1)
}

function Calendario({ elegida, diasDeAnticipacion, diasLlenos, onElegir }) {
  const [mes, setMes] = useState(primeroDelMes(hoy()))
  const puedeVolver = mes > primeroDelMes(hoy())
  const puedeAvanzar = mes < primeroDelMes(sumarDias(hoy(), diasDeAnticipacion))

  return (
    <div className="calendario">
      <div className="calendario-cabecera">
        <button
          type="button"
          aria-label="Mes anterior"
          disabled={!puedeVolver}
          onClick={() => setMes(primeroDelMes(mes, -1))}
        >
          ‹
        </button>
        <span>{nombreDelMes(mes)}</span>
        <button
          type="button"
          aria-label="Mes siguiente"
          disabled={!puedeAvanzar}
          onClick={() => setMes(primeroDelMes(mes, 1))}
        >
          ›
        </button>
      </div>
      <DiasDelMes
        mes={mes}
        elegida={elegida}
        diasDeAnticipacion={diasDeAnticipacion}
        diasLlenos={diasLlenos}
        onElegir={onElegir}
      />
    </div>
  )
}

export default Calendario
