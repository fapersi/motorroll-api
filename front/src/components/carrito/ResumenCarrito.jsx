import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import { formatearPrecio } from '../../utils/formato'

function ResumenCarrito({ carrito, onVaciar }) {
  const [confirmando, setConfirmando] = useState(false)
  const faltaStock = carrito.items.some((item) => !item.hayStockSuficiente)
  const productos = carrito.cantidadDeItems

  function vaciar() {
    setConfirmando(false)
    onVaciar()
  }

  return (
    <aside className="tarjeta resumen-carrito">
      <h2>Resumen</h2>
      <p>{productos === 1 ? '1 producto' : `${productos} productos distintos`}</p>
      <p className="resumen-total">
        Total <span className="precio">{formatearPrecio(carrito.total)}</span>
      </p>
      {faltaStock && <p className="sin-stock">Bajá las cantidades marcadas para poder comprar.</p>}
      {faltaStock && (
        <button className="boton" disabled>
          Ir a pagar
        </button>
      )}
      {!faltaStock && (
        <Link to="/checkout" className="boton">
          Ir a pagar
        </Link>
      )}
      <button className="boton boton-secundario" onClick={() => setConfirmando(true)}>
        Vaciar carrito
      </button>
      {confirmando && (
        <Modal
          titulo="¿Vaciar el carrito?"
          onConfirmar={vaciar}
          onCancelar={() => setConfirmando(false)}
        />
      )}
    </aside>
  )
}

export default ResumenCarrito
