import { useState } from 'react'
import PanelCategorias from '../components/admin/PanelCategorias'
import PanelUsuarios from '../components/admin/PanelUsuarios'

function AdminView({ usuario }) {
  const [pestana, setPestana] = useState('usuarios')

  return (
    <section>
      <h1 className="titulo-pagina">Panel de administración</h1>
      <div className="pestanas">
        <button
          className={pestana === 'usuarios' ? 'boton' : 'boton boton-secundario'}
          onClick={() => setPestana('usuarios')}
        >
          Usuarios
        </button>
        <button
          className={pestana === 'categorias' ? 'boton' : 'boton boton-secundario'}
          onClick={() => setPestana('categorias')}
        >
          Categorías
        </button>
      </div>
      <div hidden={pestana !== 'usuarios'}>
        <PanelUsuarios miId={usuario.id} />
      </div>
      <div hidden={pestana !== 'categorias'}>
        <PanelCategorias />
      </div>
    </section>
  )
}

export default AdminView