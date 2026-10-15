/*
  BORRAR ESTE COMENTARIO ANTES DE COMMITEAR (npm run lint marca error mientras esté)
  Para Thiago: Catálogo
  - Imágenes: Imagenes de Thiago/T01-catalogo, T02-catalogo-filtrado, T03-catalogo-vacio
  - Dejar <Portada /> arriba (es de Melinda)
  - Un solo GET /api/productos al montar (useEffect con [])
  - Filtros como componentes separados; al cambiar, pedir con query params (?texto=&categoriaId=&precioMax=&soloConStock=&ordenarPor=)
  - Lista vacía: mostrar "No hay productos" antes de recorrer
  - Foto: <img src={`${URL_BASE}${producto.imagenPortada}`} />
  - Componentes sugeridos en components/catalogo/: Filtros, FiltroCategoria, FiltroPrecio, FiltroOrden, Buscador, ProductCard
*/
import Portada from '../components/layout/Portada'

function CatalogoView({ usuario }) {
  return (
    <>
      <Portada />
      <h1 className="titulo-pagina">Catálogo</h1>
    </>
  )
}

export default CatalogoView
