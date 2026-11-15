import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function AccesosTienda() {
  const usuario = useSelector((state) => state.usuario.sesion)
  if (usuario.rol !== 'VENDEDOR') return null

  return (
    <div className="accesos-tienda">
      <Link to="/vendedor/diseno" className="boton boton-secundario">
        Diseño de mi tienda
      </Link>
      <Link to={`/tienda/${usuario.username}`} className="boton boton-secundario">
        Ver mi tienda
      </Link>
    </div>
  )
}

export default AccesosTienda
