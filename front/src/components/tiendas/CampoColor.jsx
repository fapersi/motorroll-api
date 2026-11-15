function CampoColor({ etiqueta, nombre, valor, onCambiar }) {
  return (
    <label className="campo campo-color">
      {etiqueta}
      <span className="selector-color">
        <input type="color" value={valor} onChange={(e) => onCambiar(nombre, e.target.value)} />
        <code>{valor.toUpperCase()}</code>
      </span>
    </label>
  )
}

export default CampoColor
