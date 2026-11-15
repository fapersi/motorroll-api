import { useDispatch } from 'react-redux'
import FilaPublicacion from './FilaPublicacion'
import { addFoto, deleteProducto, updateDescuento, updateStock } from '../../redux/productoSlice'

function TablaPublicaciones({ productos, onEditar }) {
  const dispatch = useDispatch()

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
            onStock={(stock) => dispatch(updateStock({ id: producto.id, stock }))}
            onDescuento={(descuento) => dispatch(updateDescuento({ id: producto.id, descuento }))}
            onFoto={(foto) => dispatch(addFoto({ producto, foto }))}
            onBaja={() => dispatch(deleteProducto(producto))}
          />
        ))}
      </tbody>
    </table>
  )
}

export default TablaPublicaciones
