function Aviso({ mensaje, tipo = 'error', onCerrar }) {
  if (!mensaje) return null

  return (
    <div className={`aviso aviso-${tipo}`}>
      <p>{mensaje}</p>
      {onCerrar && (
        <button className="aviso-cerrar" onClick={onCerrar}>
          ✕
        </button>
      )}
    </div>
  )
}

export default Aviso
