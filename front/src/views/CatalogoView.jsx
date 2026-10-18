import { useEffect, useState } from 'react'
import Portada from '../components/layout/Portada'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import Filtros from '../components/catalogo/Filtros'
import GrillaProductos from '../components/catalogo/GrillaProductos'
import { buscarProductos } from '../services/catalogoService'
import { listarCategorias } from '../services/categoriasService'

const SIN_FILTROS = { texto: '', categoriaId: '', precioMin: '', precioMax: '', ordenarPor: '' }

function CatalogoView() {
  const [productos, setProductos] = useState(null)
  const [categorias, setCategorias] = useState([])
  const [filtros, setFiltros] = useState(SIN_FILTROS)
  const [error, setError] = useState(null)

  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .catch((e) => setError(e.message))
  }, [])

  useEffect(() => {
    buscarProductos(filtros)
      .then(setProductos)
      .catch((e) => setError(e.message))
  }, [filtros])

  return (
    <>
      <Portada />
      <h1 className="titulo-pagina">Catálogo</h1>
      <Filtros filtros={filtros} categorias={categorias} onCambiar={setFiltros} />
      <Aviso mensaje={error} onCerrar={() => setError(null)} />
      {!productos && !error && <Cargando />}
      {productos && <GrillaProductos productos={productos} />}
    </>
  )
}

export default CatalogoView
