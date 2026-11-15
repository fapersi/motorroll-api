import Modal from '../Modal'

function ModalEliminar({ usuario, onConfirmar, onCancelar }) {
  return (
    <Modal
      titulo={`¿Eliminar a ${usuario.username}?`}
      texto="Si tiene publicaciones, órdenes, reseñas o turnos no se puede: en ese caso, deshabilitala."
      textoConfirmar="Sí, eliminar"
      onConfirmar={onConfirmar}
      onCancelar={onCancelar}
    />
  )
}

export default ModalEliminar
