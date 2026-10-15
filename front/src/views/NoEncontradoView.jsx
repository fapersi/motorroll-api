import { Link } from 'react-router-dom'
import moto from '../assets/moto-en-banco.jpg'

function NoEncontradoView() {
  return (
    <section className="pagina-sistema">
      <img src={moto} alt="Moto en un banco de rodillos" className="pagina-sistema-foto" />
      <p className="codigo-sistema">404</p>
      <h1>Esta página no existe</h1>
      <Link to="/" className="boton">
        Volver al catálogo
      </Link>
    </section>
  )
}

export default NoEncontradoView
