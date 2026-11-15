import Modal from '../Modal'

const ROLES = {
  COMPRADOR: { nombre: 'comprador', puede: 'Va a poder comprar, opinar y reservar turnos.' },
  VENDEDOR: { nombre: 'vendedor', puede: 'Va a poder publicar productos y tener su tienda.' },
  ADMIN: {
    nombre: 'administrador',
    puede: 'Va a poder habilitar y deshabilitar usuarios y manejar las categorías.',
  },
}

function ModalRol({ cambio, onConfirmar, onCancelar }) {
  const rol = ROLES[cambio.rol]

  return (
    <Modal
      titulo={`¿${cambio.usuario.username} pasa a ser ${rol.nombre}?`}
      texto={rol.puede}
      textoConfirmar="Sí, cambiar el rol"
      onConfirmar={onConfirmar}
      onCancelar={onCancelar}
    />
  )
}

export default ModalRol
