import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import CarritoVacio from '../components/carrito/CarritoVacio'
import ItemCarrito from '../components/carrito/ItemCarrito'
import ResumenCarrito from '../components/carrito/ResumenCarrito'
import {
  clearCarrito,
  fetchCarrito,
  limpiarError,
  removeItem,
  updateCantidad,
} from '../redux/carritoSlice'
import { useLimpiarAlSalir } from '../hooks/useLimpiarAlSalir'

function CarritoView() {
  const dispatch = useDispatch()
  const carrito = useSelector((state) => state.carrito)
  useLimpiarAlSalir(limpiarError)

  useEffect(() => {
    if (!carrito.cargado) dispatch(fetchCarrito())
  }, [dispatch, carrito.cargado])

  if (!carrito.cargado) return carrito.error ? <Aviso mensaje={carrito.error} /> : <Cargando />

  if (carrito.items.length === 0) return <CarritoVacio titulo="Mi carrito" />

  return (
    <section>
      <h1 className="titulo-pagina">Mi carrito</h1>
      <Aviso mensaje={carrito.error} onCerrar={() => dispatch(limpiarError())} />
      <div className="carrito">
        <ul className="lista-carrito">
          {carrito.items.map((item) => (
            <ItemCarrito
              key={item.id}
              item={item}
              ocupado={carrito.loading}
              onCantidad={(cantidad) => dispatch(updateCantidad({ itemId: item.id, cantidad }))}
              onQuitar={() => dispatch(removeItem(item.id))}
            />
          ))}
        </ul>
        <ResumenCarrito
          carrito={carrito}
          ocupado={carrito.loading}
          onVaciar={() => dispatch(clearCarrito())}
        />
      </div>
    </section>
  )
}

export default CarritoView
