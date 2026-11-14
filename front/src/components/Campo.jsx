import { bloquearSignos } from '../utils/numeros'

function Campo({ etiqueta, name, value, onChange, error, type = 'text', min }) {
  const esNumero = type === 'number'

  return (
    <label className="campo">
      {etiqueta}
      <input
        type={type}
        name={name}
        value={value}
        min={min}
        onKeyDown={esNumero ? bloquearSignos : undefined}
        onChange={onChange}
      />
      {error && <span className="campo-error">{error}</span>}
    </label>
  )
}

export default Campo
