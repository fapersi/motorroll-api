import { Link } from 'react-router-dom'
import FotoProducto from './FotoProducto'
import PrecioProducto from './PrecioProducto'

function TarjetaProducto({ producto }) {
  return (
    <Link to={`/producto/${producto.id}`} className="tarjeta tarjeta-producto">
      <FotoProducto ruta={producto.imagenPortada} nombre={producto.nombre} />
      <p className="tarjeta-categoria">{producto.categoriaNombre}</p>
      <h2>{producto.nombre}</h2>
      <PrecioProducto producto={producto} />
      {!producto.hayStock && <p className="sin-stock">Sin stock</p>}
    </Link>
  )
}

export default TarjetaProducto
