import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import AccesosTienda from '../components/vendedor/AccesosTienda'
import FormProducto from '../components/vendedor/FormProducto'
import TablaPublicaciones from '../components/vendedor/TablaPublicaciones'
import { fetchCategorias } from '../redux/categoriaSlice'
import { fetchMisProductos, limpiarError } from '../redux/productoSlice'
import { useLimpiarAlSalir } from '../hooks/useLimpiarAlSalir'

function PanelVendedorView() {
  const dispatch = useDispatch()
  const { mios, miosCargados, error } = useSelector((state) => state.productos)
  const categorias = useSelector((state) => state.categorias)
  const [creando, setCreando] = useState(false)
  const [editando, setEditando] = useState(null)
  useLimpiarAlSalir(limpiarError)

  useEffect(() => {
    if (!miosCargados) dispatch(fetchMisProductos())
  }, [dispatch, miosCargados])

  useEffect(() => {
    if (!categorias.cargado) dispatch(fetchCategorias())
  }, [dispatch, categorias.cargado])

  function cerrarFormulario() {
    setCreando(false)
    setEditando(null)
  }

  if (!miosCargados) return error ? <Aviso mensaje={error} /> : <Cargando />

  return (
    <section>
      <h1 className="titulo-pagina">Mis publicaciones</h1>
      <AccesosTienda />
      <Aviso mensaje={error} flotante onCerrar={() => dispatch(limpiarError())} />
      {creando || editando ? (
        <FormProducto
          key={editando ? editando.id : 'nuevo'}
          producto={editando}
          categorias={categorias.items}
          onCerrar={cerrarFormulario}
        />
      ) : (
        <button className="boton" onClick={() => setCreando(true)}>
          Publicar producto
        </button>
      )}
      <TablaPublicaciones productos={mios} onEditar={setEditando} />
    </section>
  )
}

export default PanelVendedorView
