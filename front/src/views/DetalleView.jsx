import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import Galeria from '../components/catalogo/Galeria'
import InfoProducto from '../components/catalogo/InfoProducto'
import { obtenerProducto } from '../services/catalogoService'

function DetalleView({ usuario }) {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    obtenerProducto(id)
      .then(setProducto)
      .catch((e) => setError(e.message))
  }, [id])

  if (error) {
    return (
      <section className="pagina-sistema">
        <Aviso mensaje={error} />
        <Link to="/" className="boton">
          Volver al catálogo
        </Link>
      </section>
    )
  }

  if (!producto) return <Cargando />

  return (
    <section className="detalle">
      <Galeria imagenes={producto.imagenes} nombre={producto.nombre} />
      <InfoProducto producto={producto} usuario={usuario} />
    </section>
  )
}

export default DetalleView
