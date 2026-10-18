import FotoProducto from '../catalogo/FotoProducto'
import SelectorCantidad from './SelectorCantidad'
import { formatearPrecio } from '../../utils/formato'

function avisoDeStock(disponible) {
  if (disponible === 0) return 'Ya no hay stock'
  if (disponible === 1) return 'Solo queda 1 unidad'
  return `Solo quedan ${disponible} unidades`
}

function ItemCarrito({ item, onCantidad, onQuitar }) {
  return (
    <li className="tarjeta item-carrito">
      <FotoProducto ruta={item.imagen} nombre={item.nombreProducto} />
      <div>
        <h2>{item.nombreProducto}</h2>
        <p>
          {formatearPrecio(item.precioUnitarioConDescuento)} c/u
          {item.descuento > 0 && <span className="etiqueta-descuento">{item.descuento}% OFF</span>}
        </p>
        {!item.hayStockSuficiente && (
          <p className="sin-stock">{avisoDeStock(item.stockDisponible)}</p>
        )}
      </div>
      <div className="item-carrito-acciones">
        <SelectorCantidad
          cantidad={item.cantidad}
          maximo={item.stockDisponible}
          onCambiar={onCantidad}
        />
        <p className="precio">{formatearPrecio(item.subtotal)}</p>
        <button className="boton boton-secundario" onClick={onQuitar}>
          Quitar
        </button>
      </div>
    </li>
  )
}

export default ItemCarrito
