import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import GrillaProductos from '../components/catalogo/GrillaProductos'
import BannerTienda from '../components/tiendas/BannerTienda'
import { fetchTienda } from '../redux/tiendaSlice'
import { estiloDeMarca } from '../utils/colores'

function TiendaView() {
  const { vendedor } = useParams()
  const dispatch = useDispatch()
  const { actual, error } = useSelector((state) => state.tiendas)
  const alDia = actual !== null && actual.vendedor === vendedor

  useEffect(() => {
    if (!alDia) dispatch(fetchTienda(vendedor))
  }, [dispatch, vendedor, alDia])

  if (!alDia && error) {
    return (
      <section className="vacio">
        <Aviso mensaje={error} />
        <Link to="/">Volver al catálogo</Link>
      </section>
    )
  }
  if (!alDia) return <Cargando />

  return (
    <section className="tienda" style={estiloDeMarca(actual)}>
      <BannerTienda tienda={actual} />
      <h2 className="titulo-tienda">Publicaciones de {actual.nombre}</h2>
      <GrillaProductos productos={actual.productos} />
    </section>
  )
}

export default TiendaView
