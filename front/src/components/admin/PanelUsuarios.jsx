import { useEffect, useState } from 'react'
import Aviso from '../Aviso'
import Cargando from '../Cargando'
import Modal from '../Modal'
import TablaUsuarios from './TablaUsuarios'
import {
  cambiarEstado,
  cambiarRol,
  eliminarUsuario,
  listarUsuarios,
} from '../../services/usuariosService'

function PanelUsuarios({ miId }) {
  const [usuarios, setUsuarios] = useState(null)
  const [error, setError] = useState('')
  const [aEliminar, setAEliminar] = useState(null)

  useEffect(() => {
    listarUsuarios()
      .then(setUsuarios)
      .catch((e) => setError(e.message))
  }, [])

  function modificar(promesa) {
    setError('')
    promesa
      .then((nuevo) => setUsuarios(usuarios.map((u) => (u.id === nuevo.id ? nuevo : u))))
      .catch((e) => setError(e.message))
  }

  function eliminar() {
    setError('')
    eliminarUsuario(aEliminar.id)
      .then(() => setUsuarios(usuarios.filter((u) => u.id !== aEliminar.id)))
      .catch((e) => setError(e.message))
      .finally(() => setAEliminar(null))
  }

  return (
    <>
      <Aviso mensaje={error} onCerrar={() => setError('')} />
      {!usuarios && !error && <Cargando />}
      {usuarios && (
        <TablaUsuarios
          usuarios={usuarios}
          miId={miId}
          onRol={(id, rol) => modificar(cambiarRol(id, rol))}
          onEstado={(id, activo) => modificar(cambiarEstado(id, activo))}
          onEliminar={setAEliminar}
        />
      )}
      {aEliminar && (
        <Modal
          titulo={`¿Eliminar a ${aEliminar.username}?`}
          onConfirmar={eliminar}
          onCancelar={() => setAEliminar(null)}
        />
      )}
    </>
  )
}

export default PanelUsuarios