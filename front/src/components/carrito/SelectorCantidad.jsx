function SelectorCantidad({ cantidad, maximo, ocupado, onCambiar }) {
  return (
    <div className="selector-cantidad">
      <button
        type="button"
        className="boton boton-secundario"
        aria-label="Restar una unidad"
        disabled={ocupado || cantidad <= 1}
        onClick={() => onCambiar(cantidad - 1)}
      >
        -
      </button>
      <span aria-label={`Cantidad: ${cantidad}`}>{cantidad}</span>
      <button
        type="button"
        className="boton boton-secundario"
        aria-label="Sumar una unidad"
        disabled={ocupado || cantidad >= maximo}
        onClick={() => onCambiar(cantidad + 1)}
      >
        +
      </button>
    </div>
  )
}

export default SelectorCantidad
