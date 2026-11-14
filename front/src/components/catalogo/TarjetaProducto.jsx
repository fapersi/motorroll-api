import { Link } from 'react-router-dom'
import FotoProducto from './FotoProducto'
import PrecioProducto from './PrecioProducto'
import Calificacion from '../resenas/Calificacion'

function TarjetaProducto({ producto }) {
  return (
    <Link to={`/producto/${producto.id}`} className="tarjeta tarjeta-producto">
      <FotoProducto ruta={producto.imagenPortada} nombre={producto.nombre} />
      <p className="tarjeta-categoria">{producto.categoriaNombre}</p>
      <h2>{producto.nombre}</h2>
      <Calificacion promedio={producto.calificacion} cantidad={producto.cantidadResenas} />
      <div className="tarjeta-pie">
        {!producto.hayStock && <p className="sin-stock">Sin stock</p>}
        <PrecioProducto producto={producto} />
      </div>
    </Link>
  )
}

export default TarjetaProducto
