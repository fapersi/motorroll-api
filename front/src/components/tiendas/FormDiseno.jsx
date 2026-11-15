import CampoColor from './CampoColor'
import PaletasSugeridas from './PaletasSugeridas'
import SubirLogo from './SubirLogo'

function FormDiseno({ tienda, datos, falta, enviando, onCambiar, onGuardar, onLogo, children }) {
  function enviar(e) {
    e.preventDefault()
    onGuardar()
  }

  return (
    <form className="tarjeta form-diseno" onSubmit={enviar} noValidate>
      <label className="campo">
        Nombre de la tienda
        <input
          value={datos.nombre}
          maxLength="60"
          onChange={(e) => onCambiar('nombre', e.target.value)}
        />
      </label>
      <label className="campo">
        Eslogan (opcional)
        <input
          value={datos.eslogan}
          maxLength="120"
          placeholder="Ej: Bancos de potencia hechos en Argentina"
          onChange={(e) => onCambiar('eslogan', e.target.value)}
        />
      </label>
      <PaletasSugeridas
        onElegir={(principal, secundario) => {
          onCambiar('colorPrincipal', principal)
          onCambiar('colorSecundario', secundario)
        }}
      />
      <div className="colores">
        <CampoColor
          etiqueta="Color principal"
          nombre="colorPrincipal"
          valor={datos.colorPrincipal}
          onCambiar={onCambiar}
        />
        <CampoColor
          etiqueta="Color secundario"
          nombre="colorSecundario"
          valor={datos.colorSecundario}
          onCambiar={onCambiar}
        />
      </div>
      <SubirLogo tienda={tienda} enviando={enviando} onElegir={onLogo} />
      {falta && <p className="campo-error">{falta}</p>}
      {children}
      <button className="boton boton-grande" disabled={enviando}>
        {enviando ? 'Guardando…' : 'Guardar diseño'}
      </button>
    </form>
  )
}

export default FormDiseno
