import { Link, Navigate, useLocation } from 'react-router-dom'
import Aviso from '../components/Aviso'
import CabeceraPasarela from '../components/pago/CabeceraPasarela'
import EstadoPago from '../components/pago/EstadoPago'
import FormTarjeta from '../components/pago/FormTarjeta'
import PagoSinTarjeta from '../components/pago/PagoSinTarjeta'
import { usePago } from '../components/pago/usePago'
import { formatearPrecio } from '../utils/formato'

function armarPedido(datos) {
  return {
    metodoPago: datos.metodoPago,
    cuotas: datos.cuotas,
    usarPuntos: datos.usarPuntos,
    direccionEnvio: datos.direccionEnvio,
  }
}

function PagoView() {
  const { state } = useLocation()
  const pago = usePago(state ? armarPedido(state) : null)

  if (!state) return <Navigate to="/checkout" replace />

  const orden = state.orden || null

  const esTarjeta = state.metodoPago.startsWith('TARJETA')
  const textoBoton = `Pagar ${formatearPrecio(state.pago.aPagar)}`

  return (
    <section className="pasarela">
      <CabeceraPasarela
        metodoPago={state.metodoPago}
        aPagar={state.pago.aPagar}
        cuotas={state.cuotas}
      />
      <Aviso mensaje={pago.error} onCerrar={pago.cerrarError} />
      {pago.error && (
        <Link to="/carrito" className="boton boton-secundario">
          Revisar mi carrito
        </Link>
      )}
      {(orden || (pago.procesando && !esTarjeta)) && <EstadoPago orden={orden} />}
      {!orden && esTarjeta && (
        <FormTarjeta
          esCredito={state.metodoPago === 'TARJETA_CREDITO'}
          textoBoton={textoBoton}
          procesando={pago.procesando}
          onPagar={pago.pagar}
        />
      )}
      {!pago.procesando && !orden && !esTarjeta && (
        <PagoSinTarjeta metodoPago={state.metodoPago} onPagar={pago.pagar} />
      )}
      {!pago.procesando && !orden && (
        <Link to="/checkout" state={state} className="pasarela-volver">
          ← Cambiar método de pago
        </Link>
      )}
    </section>
  )
}

export default PagoView
