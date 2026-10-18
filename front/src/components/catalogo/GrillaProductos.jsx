import TarjetaProducto from './TarjetaProducto'

function GrillaProductos({ productos }) {
  if (productos.length === 0) {
    return <p className="vacio">No hay productos que coincidan con la búsqueda.</p>
  }

  return (
    <div className="grilla">
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default GrillaProductos
