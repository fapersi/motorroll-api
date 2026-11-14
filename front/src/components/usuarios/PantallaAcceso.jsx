import banco from '../../assets/banco-rodillos.jpg'
import logo from '../../assets/logo-motorroll.jpg'

const BENEFICIOS = [
  'Bancos de potencia de fabricantes',
  'Turnos para probar antes de comprar',
  'Sumá puntos en cada compra',
]

function PantallaAcceso({ titulo, bajada, children }) {
  return (
    <section className="pantalla-acceso">
      <div className="acceso-imagen" style={{ backgroundImage: `url(${banco})` }}>
        <div className="acceso-imagen-texto">
          <img src={logo} alt="Motorroll" className="acceso-logo" />
          <h2>Medí la potencia real.</h2>
          <ul>
            {BENEFICIOS.map((beneficio) => (
              <li key={beneficio}>{beneficio}</li>
            ))}
          </ul>
        </div>
        <div className="franja-cuadros" />
      </div>
      <div className="acceso-panel">
        <h1>{titulo}</h1>
        <p className="acceso-bajada">{bajada}</p>
        {children}
      </div>
    </section>
  )
}

export default PantallaAcceso
