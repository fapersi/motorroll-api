import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CurvaDyno from './CurvaDyno'
import banco from '../../assets/banco-rodillos.jpg'

const VENTAJAS = [
  { titulo: 'Probalo antes de comprar', texto: 'Reservá un turno en el taller' },
  { titulo: 'Hasta 12 cuotas', texto: 'Con tarjeta de crédito' },
  { titulo: '10% de descuento', texto: 'Canjeando 500 puntos' },
]

function Portada() {
  const usuario = useSelector((state) => state.usuario.sesion)
  const puedeProbar = !usuario || usuario.rol === 'COMPRADOR'

  return (
    <>
      <section className="portada" style={{ backgroundImage: `url(${banco})` }}>
        <div className="portada-texto">
          <h1>Medí la potencia real de cada motor</h1>
          <p>
            Bancos de prueba y equipamiento para talleres, directo de fabricantes y distribuidores.
          </p>
          <div className="portada-botones">
            <a href="#catalogo" className="boton boton-grande">
              Ver catálogo
            </a>
            {puedeProbar && (
              <Link to="/turnos" className="boton boton-grande boton-secundario">
                Probá un banco
              </Link>
            )}
          </div>
        </div>
        <CurvaDyno />
      </section>
      <ul className="ventajas">
        {VENTAJAS.map((ventaja) => (
          <li key={ventaja.titulo}>
            <strong>{ventaja.titulo}</strong>
            {ventaja.texto}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Portada
