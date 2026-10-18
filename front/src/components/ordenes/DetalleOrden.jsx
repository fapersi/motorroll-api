import { formatearPrecio } from '../../utils/formato'

function DetalleOrden({ items }) {
  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio pagado</th>
          <th>Descuento</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.productoId}>
            <td>{item.nombreProducto}</td>
            <td>{item.cantidad}</td>
            <td>{formatearPrecio(item.precioUnitario)}</td>
            <td>{item.descuentoAplicado > 0 ? `${item.descuentoAplicado}%` : '—'}</td>
            <td>{formatearPrecio(item.subtotal)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DetalleOrden
