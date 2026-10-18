import { formatearPrecio } from '../../utils/formato'

function DetalleCompra({ items, total }) {
  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio unitario</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.nombreProducto}</td>
            <td>{item.cantidad}</td>
            <td>{formatearPrecio(item.precioUnitarioConDescuento)}</td>
            <td>{formatearPrecio(item.subtotal)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan="3">Total</th>
          <th>{formatearPrecio(total)}</th>
        </tr>
      </tfoot>
    </table>
  )
}

export default DetalleCompra
