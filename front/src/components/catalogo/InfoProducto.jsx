import AgregarAlCarrito from './AgregarAlCarrito'
import FichaTecnica from './FichaTecnica'
import PrecioProducto from './PrecioProducto'
import Calificacion from '../resenas/Calificacion'

function InfoProducto({ producto }) {
  return (
    <div className="detalle-info">
      <p className="tarjeta-categoria">
        {producto.categoriaNombre}
        {producto.marca && ` · ${producto.marca}`}
      </p>
      <h1>{producto.nombre}</h1>
      <Calificacion promedio={producto.calificacion} cantidad={producto.cantidadResenas} />
      <PrecioProducto producto={producto} />
      {producto.hayStock && <p>Stock disponible: {producto.stock}</p>}
      {!producto.hayStock && <p className="sin-stock">Sin stock</p>}
      <AgregarAlCarrito producto={producto} />
      <p>{producto.descripcion}</p>
      <p className="detalle-vendedor">Vendido por {producto.vendedor}</p>
      <FichaTecnica ficha={producto.fichaTecnica} />
    </div>
  )
}

export default InfoProducto
