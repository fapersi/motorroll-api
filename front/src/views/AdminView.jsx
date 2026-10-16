import { useEffect, useState } from 'react'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import Modal from '../components/Modal'
import TablaUsuarios from '../components/admin/TablaUsuarios'
import {
  cambiarEstado,
  cambiarRol,
  eliminarUsuario,
  listarUsuarios,
} from '../services/usuariosService'

function AdminView({ usuario }) {
  const [usuarios, setUsuarios] = useState(null)
  const [pestana, setPestana] = useState('usuarios')
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
    <section>
      <h1 className="titulo-pagina">Panel de administración</h1>
      <button className="boton" onClick={() => setPestana('usuarios')}>
        Usuarios
      </button>{' '}
      <button className="boton boton-secundario" onClick={() => setPestana('categorias')}>
        Categorías
      </button>
      <Aviso mensaje={error} onCerrar={() => setError('')} />
      {!usuarios && !error && <Cargando />}
      {usuarios && pestana === 'usuarios' && (
        <TablaUsuarios
          usuarios={usuarios}
          miId={usuario.id}
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
    </section>
  )
}

export default AdminView