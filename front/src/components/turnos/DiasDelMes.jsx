import {
  claveDia,
  columnaDelDia,
  DIAS_SEMANA,
  diasDelMes,
  esReservable,
  fechaLarga,
} from '../../utils/fechas'

function DiasDelMes({ mes, elegida, diasDeAnticipacion, diasLlenos, feriados, onElegir }) {
  function estado(dia) {
    const clave = claveDia(dia)
    if (!esReservable(dia, diasDeAnticipacion) || feriados.includes(clave)) return 'deshabilitado'
    if (diasLlenos.includes(clave)) return 'lleno'
    return clave === elegida ? 'elegido' : 'libre'
  }

  return (
    <div className="calendario-grilla">
      {DIAS_SEMANA.map((dia) => (
        <span key={dia.id} className="dia-semana">
          {dia.letra}
        </span>
      ))}
      {diasDelMes(mes).map((dia) => {
        const situacion = estado(dia)
        return (
          <button
            key={claveDia(dia)}
            type="button"
            className={situacion === 'libre' ? 'dia' : `dia ${situacion}`}
            style={dia.getDate() === 1 ? { gridColumnStart: columnaDelDia(dia) } : null}
            disabled={situacion === 'deshabilitado' || situacion === 'lleno'}
            aria-pressed={situacion === 'elegido'}
            aria-label={`${fechaLarga(claveDia(dia))}${situacion === 'lleno' ? ', completo' : ''}`}
            onClick={() => onElegir(claveDia(dia))}
          >
            {dia.getDate()}
          </button>
        )
      })}
    </div>
  )
}

export default DiasDelMes
