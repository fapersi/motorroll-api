import { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuUsuario from './MenuUsuario'
import logo from '../../assets/logo-motorroll.jpg'

const TODOS = ['INVITADO', 'COMPRADOR', 'VENDEDOR', 'ADMIN']

const LINKS = [
  { ruta: '/nosotros', texto: 'Nosotros', roles: TODOS },
  { ruta: '/', texto: 'Catálogo', roles: TODOS },
  { ruta: '/ordenes', texto: 'Mis órdenes', roles: ['COMPRADOR'] },
  { ruta: '/vendedor', texto: 'Panel vendedor', roles: ['VENDEDOR', 'ADMIN'] },
  { ruta: '/admin', texto: 'Admin', roles: ['ADMIN'] },
]

function Navbar({ usuario, onSalir }) {
  const [abierto, setAbierto] = useState(false)
  const rol = usuario ? usuario.rol : 'INVITADO'
  const links = LINKS.filter((link) => link.roles.includes(rol))

  return (
    <header className="navbar">
      <Link to="/">
        <img src={logo} alt="Motorroll" className="navbar-logo" />
      </Link>
      <button className="boton-menu" onClick={() => setAbierto(!abierto)}>
        {abierto ? '✕' : '☰'}
      </button>
      <nav className={abierto ? 'navbar-menu abierto' : 'navbar-menu'}>
        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link.ruta}>
              <Link to={link.ruta} onClick={() => setAbierto(false)}>
                {link.texto}
              </Link>
            </li>
          ))}
        </ul>
        <MenuUsuario usuario={usuario} onSalir={onSalir} />
      </nav>
    </header>
  )
}

export default Navbar
