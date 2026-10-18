import { formatearPrecio } from '../../utils/formato'

function PrecioProducto({ producto }) {
  const conDescuento = producto.descuento > 0

  return (
    <p className="precio-producto">
      {conDescuento && <span className="precio-anterior">{formatearPrecio(producto.precio)}</span>}
      <span className="precio">{formatearPrecio(producto.precioFinal)}</span>
      {conDescuento && <span className="etiqueta-descuento">{producto.descuento}% OFF</span>}
    </p>
  )
}

export default PrecioProducto
