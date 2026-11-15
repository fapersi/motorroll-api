import { bloquearSignos, bloquearSignosDecimales } from '../utils/numeros'

function Campo(props) {
  const { etiqueta, name, value, onChange, error, ayuda, type = 'text', min } = props
  const { decimales = false, inputMode, autoComplete } = props
  const esNumero = type === 'number'
  const bloquear = decimales ? bloquearSignosDecimales : bloquearSignos

  return (
    <label className="campo">
      {etiqueta}
      <input
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        name={name}
        value={value}
        min={min}
        step={decimales ? '0.01' : null}
        onKeyDown={esNumero ? bloquear : null}
        onChange={onChange}
      />
      {error && <span className="campo-error">{error}</span>}
      {ayuda && !error && <span className="campo-ayuda">{ayuda}</span>}
    </label>
  )
}

export default Campo
