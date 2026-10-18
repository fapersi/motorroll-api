import FilaPublicacion from './FilaPublicacion'
import {
  agregarFotos,
  cambiarDescuento,
  cambiarStock,
  darDeBaja,
} from '../../services/catalogoService'

function TablaPublicaciones({ productos, onEditar, onCambio }) {
  if (productos.length === 0) {
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
        {productos.map((producto) => (
          <FilaPublicacion
            key={producto.id}
            producto={producto}
            onEditar={() => onEditar(producto)}
            onStock={(stock) => onCambio(cambiarStock(producto, stock))}
            onDescuento={(descuento) => onCambio(cambiarDescuento(producto, descuento))}
            onFoto={(foto) => onCambio(agregarFotos(producto, [foto]))}
            onBaja={() => onCambio(darDeBaja(producto))}
          />
        ))}
      </tbody>
    </table>
  )
}

export default TablaPublicaciones
