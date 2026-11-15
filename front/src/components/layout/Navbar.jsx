import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AtajosUsuario from './AtajosUsuario'
import BotonTema from './BotonTema'
import MenuUsuario from './MenuUsuario'
import logo from '../../assets/logo-motorroll.jpg'

const TODOS = ['INVITADO', 'COMPRADOR', 'VENDEDOR', 'ADMIN']

const LINKS = [
  { ruta: '/nosotros', texto: 'Nosotros', roles: TODOS },
  { ruta: '/', texto: 'Catálogo', roles: TODOS },
  { ruta: '/turnos', texto: 'Probá un banco', roles: ['INVITADO', 'COMPRADOR'] },
  { ruta: '/ordenes', texto: 'Mis órdenes', roles: ['COMPRADOR'] },
  { ruta: '/vendedor', texto: 'Panel vendedor', roles: ['VENDEDOR'] },
  { ruta: '/admin', texto: 'Admin', roles: ['ADMIN'] },
]

function Navbar() {
  const usuario = useSelector((state) => state.usuario.sesion)
  const [abierto, setAbierto] = useState(false)
  const rol = usuario ? usuario.rol : 'INVITADO'
  const links = LINKS.filter((link) => link.roles.includes(rol))

  return (
    <header className="navbar">
      <Link to="/">
        <img src={logo} alt="Motorroll" className="navbar-logo" />
      </Link>
      <AtajosUsuario usuario={usuario} onNavegar={() => setAbierto(false)} />
      <button
        type="button"
        className="boton-menu"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={abierto}
        onClick={() => setAbierto(!abierto)}
      >
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
        <div className="navbar-derecha">
          <BotonTema />
          <MenuUsuario usuario={usuario} onNavegar={() => setAbierto(false)} />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
