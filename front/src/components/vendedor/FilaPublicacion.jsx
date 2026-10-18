import { useState } from 'react'
import Modal from '../Modal'
import FotoProducto from '../catalogo/FotoProducto'
import EditorNumero from './EditorNumero'
import SubirFoto from './SubirFoto'
import { formatearPrecio } from '../../utils/formato'

function FilaPublicacion({ producto, onEditar, onStock, onDescuento, onFoto, onBaja }) {
  const [confirmando, setConfirmando] = useState(false)
  const portada = producto.imagenes[0]?.url

  function confirmarBaja() {
    setConfirmando(false)
    onBaja(producto)
  }

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
        <EditorNumero key={producto.stock} valor={producto.stock} min="0" onGuardar={(stock) => onStock(producto, stock)} />
      </td>
      <td>
        <EditorNumero key={producto.descuento} valor={producto.descuento} min="0" max="100" onGuardar={(descuento) => onDescuento(producto, descuento)} />
      </td>
      <td>{producto.hayStock ? 'Publicada' : 'Sin stock'}</td>
      <td>
        <div className="celda-acciones">
          <button className="boton boton-secundario" onClick={() => onEditar(producto)}>
            Editar
          </button>
          <SubirFoto onSubir={(foto) => onFoto(producto, foto)} />
          <button className="boton" onClick={() => setConfirmando(true)}>
            Dar de baja
          </button>
        </div>
        {confirmando && (
          <Modal titulo={`¿Dar de baja ${producto.nombre}?`} onConfirmar={confirmarBaja} onCancelar={() => setConfirmando(false)} />
        )}
      </td>
    </tr>
  )
}

export default FilaPublicacion
