import { useEffect, useState } from 'react'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import FormProducto from '../components/vendedor/FormProducto'
import TablaPublicaciones from '../components/vendedor/TablaPublicaciones'
import { listarCategorias } from '../services/categoriasService'
import { misPublicaciones } from '../services/catalogoService'

function PanelVendedorView() {
  const [publicaciones, setPublicaciones] = useState(null)
  const [categorias, setCategorias] = useState([])
  const [creando, setCreando] = useState(false)
  const [editando, setEditando] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    misPublicaciones()
      .then(setPublicaciones)
      .catch((e) => setError(e.message))
    listarCategorias()
      .then(setCategorias)
      .catch((e) => setError(e.message))
  }, [])

  function reemplazar(producto) {
    setPublicaciones(publicaciones.map((p) => (p.id === producto.id ? producto : p)))
  }

  function actualizar(promesa) {
    setError(null)
    promesa.then(reemplazar).catch((e) => setError(e.message))
  }

  function cerrarFormulario() {
    setCreando(false)
    setEditando(null)
  }

  function guardado(producto) {
    if (editando) reemplazar(producto)
    else setPublicaciones([producto, ...publicaciones])
    cerrarFormulario()
  }

  if (!publicaciones) return error ? <Aviso mensaje={error} /> : <Cargando />

  return (
    <section>
      <h1 className="titulo-pagina">Mis publicaciones</h1>
      <Aviso mensaje={error} onCerrar={() => setError(null)} />
      {creando || editando ? (
        <FormProducto
          key={editando ? editando.id : 'nuevo'}
          producto={editando}
          categorias={categorias}
          onGuardado={guardado}
          onCancelar={cerrarFormulario}
        />
      ) : (
        <button className="boton" onClick={() => setCreando(true)}>
          Publicar producto
        </button>
      )}
      <TablaPublicaciones productos={publicaciones} onEditar={setEditando} onCambio={actualizar} />
    </section>
  )
}

export default PanelVendedorView
