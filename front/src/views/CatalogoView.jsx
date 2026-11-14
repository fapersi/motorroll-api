import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Portada from '../components/layout/Portada'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import Filtros from '../components/catalogo/Filtros'
import GrillaProductos from '../components/catalogo/GrillaProductos'
import { fetchCategorias } from '../redux/categoriaSlice'
import { cambiarFiltros, fetchProductos, limpiarError } from '../redux/productoSlice'

function CatalogoView() {
  const dispatch = useDispatch()
  const { items, filtros, filtrosCargados, loading, error } = useSelector(
    (state) => state.productos,
  )
  const categorias = useSelector((state) => state.categorias)
  const alDia = filtros === filtrosCargados

  useEffect(() => {
    if (!categorias.cargado) dispatch(fetchCategorias())
  }, [dispatch, categorias.cargado])

  useEffect(() => {
    if (!alDia) dispatch(fetchProductos(filtros))
  }, [dispatch, filtros, alDia])

  return (
    <>
      <Portada />
      <h1 className="titulo-pagina" id="catalogo">
        Catálogo
      </h1>
      <Filtros
        filtros={filtros}
        categorias={categorias.items}
        onCambiar={(nuevos) => dispatch(cambiarFiltros(nuevos))}
      />
      <Aviso mensaje={error} onCerrar={() => dispatch(limpiarError())} />
      {loading && <Cargando />}
      {!loading && !error && <GrillaProductos productos={items} />}
    </>
  )
}

export default CatalogoView
