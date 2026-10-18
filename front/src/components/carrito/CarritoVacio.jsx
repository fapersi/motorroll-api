import { Link } from 'react-router-dom'

function CarritoVacio({ titulo }) {
  return (
    <section className="pagina-sistema">
      <h1 className="titulo-pagina">{titulo}</h1>
      <p>Tu carrito está vacío.</p>
      <Link to="/" className="boton">
        Ver el catálogo
      </Link>
    </section>
  )
}

export default CarritoVacio
