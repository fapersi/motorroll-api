import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoTienda from './LogoTienda'
import { fetchTiendas } from '../../redux/tiendaSlice'
import { estiloDeMarca } from '../../utils/colores'

function TiendasOficiales() {
  const dispatch = useDispatch()
  const lista = useSelector((state) => state.tiendas.lista)

  useEffect(() => {
    if (lista === null) dispatch(fetchTiendas())
  }, [dispatch, lista])

  const conPublicaciones = lista ? lista.filter((tienda) => tienda.cantidadProductos > 0) : []
  if (conPublicaciones.length === 0) return null

  return (
    <section className="tiendas-oficiales" aria-labelledby="titulo-tiendas">
      <h2 id="titulo-tiendas">Tiendas oficiales</h2>
      <ul>
        {conPublicaciones.map((tienda) => (
          <li key={tienda.vendedor}>
            <Link
              to={`/tienda/${tienda.vendedor}`}
              className="tarjeta-tienda"
              style={estiloDeMarca(tienda)}
            >
              <LogoTienda tienda={tienda} />
              <span>
                <strong>{tienda.nombre}</strong>
                {tienda.cantidadProductos === 1
                  ? '1 publicación'
                  : `${tienda.cantidadProductos} publicaciones`}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TiendasOficiales
