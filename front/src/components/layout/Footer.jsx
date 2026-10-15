import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="franja-cuadros" />
      <p>
        Motorroll · Bancos de prueba de potencia · <Link to="/nosotros">Nosotros y contacto</Link>
      </p>
      <p className="footer-chico">TPO Aplicaciones Interactivas · UADE · 2° cuatrimestre 2026</p>
    </footer>
  )
}

export default Footer
