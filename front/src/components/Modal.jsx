import { useId } from 'react'

function Modal({
  titulo,
  texto,
  textoCancelar = 'Cancelar',
  textoConfirmar = 'Confirmar',
  onConfirmar,
  onCancelar,
}) {
  const idTitulo = useId()

  return (
    <div className="modal-fondo" onClick={onCancelar}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === 'Escape' && onCancelar()}
      >
        <h2 id={idTitulo}>{titulo}</h2>
        {texto && <p>{texto}</p>}
        <div className="modal-botones">
          <button type="button" className="boton boton-secundario" autoFocus onClick={onCancelar}>
            {textoCancelar}
          </button>
          <button type="button" className="boton" onClick={onConfirmar}>
            {textoConfirmar}
          </button>
        </div>
      </section>
    </div>
  )
}

export default Modal
