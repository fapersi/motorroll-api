import { formatearPrecio } from '../../utils/formato'

function DetalleCompra({ items, total }) {
  return (
    <section className="tarjeta bloque-pago">
      <h2>Tu pedido</h2>
      <ul className="detalle-compra">
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.nombreProducto}</span>
            <span>
              {item.cantidad} × {formatearPrecio(item.precioUnitarioConDescuento)}
            </span>
            <strong>{formatearPrecio(item.subtotal)}</strong>
          </li>
        ))}
      </ul>
      <p className="resumen-total">
        Total <span className="precio">{formatearPrecio(total)}</span>
      </p>
    </section>
  )
}

export default DetalleCompra
