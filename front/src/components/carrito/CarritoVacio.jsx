import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function CarritoVacio({ titulo }) {
  const ultima = useSelector((state) => state.ordenes.ultima)

  return (
    <section className="pagina-sistema">
      <h1 className="titulo-pagina">{titulo}</h1>
      {ultima && (
        <p className="compra-confirmada">
          Tu orden #{ultima.id} ya está confirmada. <Link to="/ordenes">Ver mis órdenes</Link>
        </p>
      )}
      <p>Tu carrito está vacío.</p>
      <Link to="/" className="boton">
        Ver el catálogo
      </Link>
    </section>
  )
}

export default CarritoVacio
