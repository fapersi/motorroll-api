function SelectorCantidad({ cantidad, maximo, onCambiar }) {
  return (
    <div className="selector-cantidad">
      <button
        className="boton boton-secundario"
        disabled={cantidad <= 1}
        onClick={() => onCambiar(cantidad - 1)}
      >
        -
      </button>
      <span>{cantidad}</span>
      <button
        className="boton boton-secundario"
        disabled={cantidad >= maximo}
        onClick={() => onCambiar(cantidad + 1)}
      >
        +
      </button>
    </div>
  )
}

export default SelectorCantidad
