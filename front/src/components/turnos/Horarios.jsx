function Horarios({ horarios, ocupados, elegido, onElegir }) {
  return (
    <div className="horarios">
      {horarios.map((hora) => {
        const ocupado = ocupados.includes(hora)
        return (
          <button
            key={hora}
            type="button"
            disabled={ocupado}
            className={hora === elegido ? 'horario elegido' : 'horario'}
            onClick={() => onElegir(hora)}
          >
            {ocupado ? `${hora} · ocupado` : hora}
          </button>
        )
      })}
    </div>
  )
}

export default Horarios
