function Aviso({ mensaje, tipo = 'error', flotante = false, accion, onCerrar }) {
  if (!mensaje) return null

  return (
    <div
      className={flotante ? `aviso aviso-${tipo} aviso-flotante` : `aviso aviso-${tipo}`}
      role={tipo === 'error' ? 'alert' : 'status'}
    >
      <p>{mensaje}</p>
      {accion && (
        <button type="button" className="boton boton-chico" onClick={accion.onClick}>
          {accion.texto}
        </button>
      )}
      {onCerrar && (
        <button type="button" className="aviso-cerrar" aria-label="Cerrar aviso" onClick={onCerrar}>
          ✕
        </button>
      )}
    </div>
  )
}

export default Aviso
