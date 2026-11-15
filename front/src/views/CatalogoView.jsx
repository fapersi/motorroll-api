import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Portada from '../components/layout/Portada'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import Filtros from '../components/catalogo/Filtros'
import GrillaProductos from '../components/catalogo/GrillaProductos'
import TiendasOficiales from '../components/tiendas/TiendasOficiales'
import { fetchCategorias } from '../redux/categoriaSlice'
import { cambiarFiltros, fetchProductos, limpiarError } from '../redux/productoSlice'

const SIN_FILTROS = { texto: '', categorias: [], precioMin: '', precioMax: '', ordenarPor: '' }

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
      <TiendasOficiales />
      <h2 className="titulo-pagina" id="catalogo">
        Catálogo
      </h2>
      <Filtros
        filtros={filtros}
        categorias={categorias.items}
        onCambiar={(nuevos) => dispatch(cambiarFiltros(nuevos))}
      />
      <Aviso
        mensaje={error}
        accion={{ texto: 'Reintentar', onClick: () => dispatch(fetchProductos(filtros)) }}
        onCerrar={() => dispatch(limpiarError())}
      />
      {loading && items.length === 0 && <Cargando />}
      <div className={loading ? 'actualizando' : undefined} aria-busy={loading}>
        {!error && !(loading && items.length === 0) && (
          <GrillaProductos
            productos={items}
            onLimpiar={() => dispatch(cambiarFiltros(SIN_FILTROS))}
          />
        )}
      </div>
    </>
  )
}

export default CatalogoView
