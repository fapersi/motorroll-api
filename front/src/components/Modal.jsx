function Modal({ titulo, onConfirmar, onCancelar }) {
  return (
    <div className="modal-fondo">
      <section className="modal">
        <h2>{titulo}</h2>
        <div className="modal-botones">
          <button className="boton boton-secundario" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="boton" onClick={onConfirmar}>
            Confirmar
          </button>
        </div>
      </section>
    </div>
  )
}

export default Modal
