import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import TarjetaOrden from '../components/ordenes/TarjetaOrden'
import { fetchOrdenes } from '../redux/ordenSlice'

function OrdenesView() {
  const dispatch = useDispatch()
  const { items, cargado, error } = useSelector((state) => state.ordenes)

  useEffect(() => {
    if (!cargado) dispatch(fetchOrdenes())
  }, [dispatch, cargado])

  if (!cargado) return error ? <Aviso mensaje={error} /> : <Cargando />

  return (
    <section className="ordenes">
      <h1 className="titulo-pagina">Mis órdenes</h1>
      {items.length === 0 && (
        <p className="vacio">
          Todavía no hiciste compras. <Link to="/">Ver el catálogo</Link>
        </p>
      )}
      {items.map((orden) => (
        <TarjetaOrden key={orden.id} orden={orden} />
      ))}
    </section>
  )
}

export default OrdenesView
