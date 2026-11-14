import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import Galeria from '../components/catalogo/Galeria'
import InfoProducto from '../components/catalogo/InfoProducto'
import SeccionResenas from '../components/resenas/SeccionResenas'
import { fetchProductoPorId } from '../redux/productoSlice'

function DetalleView() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { detalle, error } = useSelector((state) => state.productos)
  const cargado = detalle !== null && String(detalle.id) === id

  useEffect(() => {
    if (!cargado) dispatch(fetchProductoPorId(id))
  }, [dispatch, id, cargado])

  if (cargado) {
    return (
      <>
        <section className="detalle">
          <Galeria imagenes={detalle.imagenes} nombre={detalle.nombre} />
          <InfoProducto producto={detalle} />
        </section>
        <SeccionResenas productoId={detalle.id} />
      </>
    )
  }

  if (!error) return <Cargando />

  return (
    <section className="pagina-sistema">
      <Aviso mensaje={error} />
      <Link to="/" className="boton">
        Volver al catálogo
      </Link>
    </section>
  )
}

export default DetalleView
