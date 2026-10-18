import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import CarritoVacio from '../components/carrito/CarritoVacio'
import DetalleCompra from '../components/carrito/DetalleCompra'
import { confirmarCompra, verCarrito } from '../services/carritoService'

function CheckoutView() {
  const [carrito, setCarrito] = useState(null)
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    verCarrito()
      .then(setCarrito)
      .catch((e) => setError(e.message))
  }, [])

  function confirmar() {
    setError(null)
    setEnviando(true)
    confirmarCompra()
      .then((orden) => navigate('/ordenes', { state: { aviso: `¡Compra confirmada! Tu número de orden es ${orden.id}.` } }))
      .catch((e) => {
        setError(e.message)
        setEnviando(false)
      })
  }

  if (!carrito) return error ? <Aviso mensaje={error} /> : <Cargando />

  if (carrito.items.length === 0) return <CarritoVacio titulo="Confirmar compra" />

  return (
    <section className="checkout">
      <h1 className="titulo-pagina">Confirmar compra</h1>
      <Aviso mensaje={error} onCerrar={() => setError(null)} />
      <DetalleCompra items={carrito.items} total={carrito.total} />
      <div className="checkout-botones">
        <Link to="/carrito" className="boton boton-secundario">
          Volver al carrito
        </Link>
        <button className="boton" disabled={enviando} onClick={confirmar}>
          {enviando ? 'Confirmando...' : 'Confirmar compra'}
        </button>
      </div>
    </section>
  )
}

export default CheckoutView
