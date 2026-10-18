import { useEffect, useState } from 'react'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import CarritoVacio from '../components/carrito/CarritoVacio'
import ItemCarrito from '../components/carrito/ItemCarrito'
import ResumenCarrito from '../components/carrito/ResumenCarrito'
import { cambiarCantidad, quitarItem, vaciarCarrito, verCarrito } from '../services/carritoService'

function CarritoView() {
  const [carrito, setCarrito] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    verCarrito()
      .then(setCarrito)
      .catch((e) => setError(e.message))
  }, [])

  function actualizar(promesa) {
    setError(null)
    promesa.then(setCarrito).catch((e) => setError(e.message))
  }

  if (!carrito) return error ? <Aviso mensaje={error} /> : <Cargando />

  if (carrito.items.length === 0) return <CarritoVacio titulo="Mi carrito" />

  return (
    <section>
      <h1 className="titulo-pagina">Mi carrito</h1>
      <Aviso mensaje={error} onCerrar={() => setError(null)} />
      <div className="carrito">
        <ul className="lista-carrito">
          {carrito.items.map((item) => (
            <ItemCarrito
              key={item.id}
              item={item}
              onCantidad={(cantidad) => actualizar(cambiarCantidad(item.id, cantidad))}
              onQuitar={() => actualizar(quitarItem(item.id))}
            />
          ))}
        </ul>
        <ResumenCarrito carrito={carrito} onVaciar={() => actualizar(vaciarCarrito())} />
      </div>
    </section>
  )
}

export default CarritoView
