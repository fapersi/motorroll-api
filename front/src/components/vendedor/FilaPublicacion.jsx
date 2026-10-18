import FotoProducto from '../catalogo/FotoProducto'
import AccionesPublicacion from './AccionesPublicacion'
import EditorNumero from './EditorNumero'
import { formatearPrecio } from '../../utils/formato'

function FilaPublicacion({ producto, onEditar, onStock, onDescuento, onFoto, onBaja }) {
  const portada = producto.imagenes.length > 0 ? producto.imagenes[0].url : null

  if (!producto.activo) {
    return (
      <tr className="fila-baja">
        <td>{producto.nombre}</td>
        <td>{formatearPrecio(producto.precioFinal)}</td>
        <td>{producto.stock}</td>
        <td>{producto.descuento}</td>
        <td colSpan="2">Dada de baja</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>
        <div className="celda-producto">
          <FotoProducto ruta={portada} nombre={producto.nombre} />
          {producto.nombre}
        </div>
      </td>
      <td>{formatearPrecio(producto.precioFinal)}</td>
      <td>
        <EditorNumero key={producto.stock} valor={producto.stock} onGuardar={onStock} />
      </td>
      <td>
        <EditorNumero key={producto.descuento} valor={producto.descuento} onGuardar={onDescuento} />
      </td>
      <td>{producto.hayStock ? 'Publicada' : 'Sin stock'}</td>
      <td>
        <AccionesPublicacion
          nombre={producto.nombre}
          onEditar={onEditar}
          onFoto={onFoto}
          onBaja={onBaja}
        />
      </td>
    </tr>
  )
}

export default FilaPublicacion
