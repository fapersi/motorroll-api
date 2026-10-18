import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import TarjetaOrden from '../components/ordenes/TarjetaOrden'
import { misOrdenes } from '../services/carritoService'

function OrdenesView() {
  const location = useLocation()
  const [ordenes, setOrdenes] = useState(null)
  const [error, setError] = useState(null)
  const [aviso, setAviso] = useState(location.state ? location.state.aviso : null)

  useEffect(() => {
    misOrdenes()
      .then(setOrdenes)
      .catch((e) => setError(e.message))
  }, [])

  if (!ordenes) return error ? <Aviso mensaje={error} /> : <Cargando />

  return (
    <section className="ordenes">
      <h1 className="titulo-pagina">Mis órdenes</h1>
      <Aviso mensaje={aviso} tipo="exito" onCerrar={() => setAviso(null)} />
      {ordenes.length === 0 && (
        <p className="vacio">
          Todavía no hiciste compras. <Link to="/">Ver el catálogo</Link>
        </p>
      )}
      {ordenes.map((orden) => (
        <TarjetaOrden key={orden.id} orden={orden} />
      ))}
    </section>
  )
}

export default OrdenesView
