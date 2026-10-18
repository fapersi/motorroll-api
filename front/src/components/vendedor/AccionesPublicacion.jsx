import { useState } from 'react'
import Modal from '../Modal'
import SubirFoto from './SubirFoto'

function AccionesPublicacion({ nombre, onEditar, onFoto, onBaja }) {
  const [confirmando, setConfirmando] = useState(false)

  function confirmarBaja() {
    setConfirmando(false)
    onBaja()
  }

  return (
    <div className="celda-acciones">
      <button className="boton boton-secundario" onClick={onEditar}>
        Editar
      </button>
      <SubirFoto onSubir={onFoto} />
      <button className="boton" onClick={() => setConfirmando(true)}>
        Dar de baja
      </button>
      {confirmando && (
        <Modal
          titulo={`¿Dar de baja ${nombre}?`}
          onConfirmar={confirmarBaja}
          onCancelar={() => setConfirmando(false)}
        />
      )}
    </div>
  )
}

export default AccionesPublicacion
