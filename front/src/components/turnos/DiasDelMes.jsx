import { claveDia, DIAS_SEMANA, diasDelMes, esReservable } from '../../utils/fechas'

function DiasDelMes({ mes, elegida, diasDeAnticipacion, diasLlenos, onElegir }) {
  function clase(dia) {
    const clave = claveDia(dia)
    if (!esReservable(dia, diasDeAnticipacion)) return 'dia deshabilitado'
    if (diasLlenos.includes(clave)) return 'dia lleno'
    return clave === elegida ? 'dia elegido' : 'dia'
  }

  return (
    <div className="calendario-grilla">
      {DIAS_SEMANA.map((letra, i) => (
        <span key={i} className="dia-semana">
          {letra}
        </span>
      ))}
      {diasDelMes(mes).map((dia, i) =>
        dia === null ? (
          <span key={`vacio-${i}`} />
        ) : (
          <button
            key={claveDia(dia)}
            type="button"
            className={clase(dia)}
            disabled={clase(dia) === 'dia deshabilitado' || clase(dia) === 'dia lleno'}
            onClick={() => onElegir(claveDia(dia))}
          >
            {dia.getDate()}
          </button>
        ),
      )}
    </div>
  )
}

export default DiasDelMes
