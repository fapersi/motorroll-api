import { formatearPrecio } from '../../utils/formato'

function ResumenPago({ pago, cuotas, children }) {
  return (
    <aside className="tarjeta resumen-carrito">
      <h2>Resumen</h2>
      <p className="resumen-fila">
        Productos <span>{formatearPrecio(pago.subtotal)}</span>
      </p>
      {pago.descuento > 0 && (
        <p className="resumen-fila resumen-descuento">
          Descuento por puntos <span>− {formatearPrecio(pago.descuento)}</span>
        </p>
      )}
      <p className="resumen-total">
        Total <span className="precio">{formatearPrecio(pago.aPagar)}</span>
      </p>
      {cuotas > 1 && (
        <p className="resumen-fila">
          {cuotas} cuotas de <span>{formatearPrecio(pago.aPagar / cuotas)}</span>
        </p>
      )}
      <p className="puntos-ganados">+{pago.ganados} puntos con esta compra</p>
      {children}
    </aside>
  )
}

export default ResumenPago
