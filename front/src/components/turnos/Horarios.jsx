function Horarios({ horarios, ocupados, propios, elegido, onElegir }) {
  function clase(hora) {
    if (propios.includes(hora)) return 'horario propio'
    return hora === elegido ? 'horario elegido' : 'horario'
  }

  function texto(hora) {
    if (propios.includes(hora)) return `${hora} · tu turno`
    return ocupados.includes(hora) ? `${hora} · ocupado` : hora
  }

  return (
    <div className="horarios">
      {horarios.map((hora) => (
        <button
          key={hora}
          type="button"
          disabled={ocupados.includes(hora) || propios.includes(hora)}
          className={clase(hora)}
          onClick={() => onElegir(hora)}
        >
          {texto(hora)}
        </button>
      ))}
    </div>
  )
}

export default Horarios
