import TarjetaProducto from './TarjetaProducto'

function GrillaProductos({ productos, mensajeVacio, onLimpiar }) {
  if (productos.length === 0) {
    return (
      <div className="vacio vacio-acciones">
        <p>{mensajeVacio || 'No hay equipos que coincidan con la búsqueda.'}</p>
        {onLimpiar && (
          <button type="button" className="boton boton-secundario" onClick={onLimpiar}>
            Limpiar filtros
          </button>
        )}
      </div>
    )
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
