function Campo({ etiqueta, name, value, onChange, error, type = 'text' }) {
  return (
    <label className="campo">
      {etiqueta}
      <input type={type} name={name} value={value} onChange={onChange} />
      {error && <span className="campo-error">{error}</span>}
    </label>
  )
}

export default Campo
