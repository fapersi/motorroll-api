import FilaPublicacion from './FilaPublicacion'

function TablaPublicaciones({ publicaciones, onEditar, onStock, onDescuento, onFoto, onBaja }) {
  if (publicaciones.length === 0) {
    return <p className="vacio">Todavía no publicaste productos.</p>
  }

  return (
    <table className="tabla tabla-publicaciones">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio final</th>
          <th>Stock</th>
          <th>Descuento %</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {publicaciones.map((producto) => (
          <FilaPublicacion
            key={producto.id}
            producto={producto}
            onEditar={onEditar}
            onStock={onStock}
            onDescuento={onDescuento}
            onFoto={onFoto}
            onBaja={onBaja}
          />
        ))}
      </tbody>
    </table>
  )
}

export default TablaPublicaciones
