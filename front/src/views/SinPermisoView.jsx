import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function SinPermisoView() {
  const usuario = useSelector((state) => state.usuario.sesion)
  return (
    <section className="pagina-sistema">
      <p className="codigo-sistema">403</p>
      <h1>No tenés permiso para ver esta página</h1>
      {usuario && <p>Ingresaste como {usuario.rol}.</p>}
      <Link to="/" className="boton">
        Volver al catálogo
      </Link>
    </section>
  )
}

export default SinPermisoView
