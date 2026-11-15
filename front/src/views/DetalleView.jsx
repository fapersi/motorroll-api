import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Cargando from '../components/Cargando'
import Galeria from '../components/catalogo/Galeria'
import InfoProducto from '../components/catalogo/InfoProducto'
import SeccionResenas from '../components/resenas/SeccionResenas'
import { fetchProductoPorId, limpiarError } from '../redux/productoSlice'
import { useLimpiarAlSalir } from '../hooks/useLimpiarAlSalir'

function DetalleView() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { detalle, error } = useSelector((state) => state.productos)
  const cargado = detalle !== null && String(detalle.id) === id
  useLimpiarAlSalir(limpiarError)

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
      <h1 className="titulo-pagina">Este equipo no está disponible</h1>
      <p>Puede que el vendedor lo haya dado de baja o que el enlace esté mal escrito.</p>
      <Link to="/" className="boton">
        Volver al catálogo
      </Link>
    </section>
  )
}

export default DetalleView
