import { useDispatch } from 'react-redux'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import CarritoVacio from '../components/carrito/CarritoVacio'
import DetalleCompra from '../components/carrito/DetalleCompra'
import CanjePuntos from '../components/pago/CanjePuntos'
import DireccionEnvio from '../components/pago/DireccionEnvio'
import ElegirMetodo from '../components/pago/ElegirMetodo'
import ResumenPago from '../components/pago/ResumenPago'
import { useDatosCheckout } from '../components/pago/useDatosCheckout'
import { useEleccionPago } from '../components/pago/useEleccionPago'
import { limpiarError } from '../redux/carritoSlice'

function CheckoutView() {
  const dispatch = useDispatch()
  const { carrito, puntos } = useDatosCheckout()
  const { state } = useLocation()
  const eleccion = useEleccionPago(carrito.total, state)
  const navigate = useNavigate()

  if (!carrito.cargado) return carrito.error ? <Aviso mensaje={carrito.error} /> : <Cargando />
  if (carrito.items.length === 0) return <CarritoVacio titulo="Confirmar compra" />
  if (carrito.items.some((item) => !item.hayStockSuficiente))
    return <Navigate to="/carrito" replace />

  return (
    <section>
      <h1 className="titulo-pagina">Confirmar compra</h1>
      <Aviso mensaje={carrito.error} onCerrar={() => dispatch(limpiarError())} />
      <div className="carrito">
        <div className="checkout-columna">
          <DetalleCompra items={carrito.items} total={carrito.total} />
          <DireccionEnvio direccion={eleccion.direccion} onCambiar={eleccion.setDireccion} />
          <ElegirMetodo
            metodo={eleccion.metodo}
            cuotas={eleccion.cuotas}
            aPagar={eleccion.pago.aPagar}
            onMetodo={eleccion.setMetodo}
            onCuotas={eleccion.setCuotas}
          />
          <CanjePuntos
            puntos={puntos}
            usarPuntos={eleccion.usarPuntos}
            onCambiar={eleccion.setUsarPuntos}
          />
        </div>
        <ResumenPago pago={eleccion.pago} cuotas={eleccion.cuotasFinales}>
          <button
            className="boton"
            disabled={eleccion.incompleto}
            onClick={() => navigate('/pago', { state: eleccion.datosDelPago })}
          >
            {eleccion.textoDelBoton}
          </button>
          <Link to="/carrito" className="boton boton-secundario">
            Volver al carrito
          </Link>
        </ResumenPago>
      </div>
    </section>
  )
}

export default CheckoutView
