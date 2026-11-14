import { Link, Navigate, useLocation } from 'react-router-dom'
import Aviso from '../components/Aviso'
import CabeceraPasarela from '../components/pago/CabeceraPasarela'
import EstadoPago from '../components/pago/EstadoPago'
import FormTarjeta from '../components/pago/FormTarjeta'
import PagoSinTarjeta from '../components/pago/PagoSinTarjeta'
import { usePago } from '../components/pago/usePago'
import { formatearPrecio } from '../utils/formato'

function PagoView() {
  const { state } = useLocation()
  const pedido = state ? { ...state, pago: undefined } : null
  const pago = usePago(pedido)

  if (!state) return <Navigate to="/checkout" replace />

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
      {pago.procesando && <EstadoPago orden={pago.orden} />}
      {!pago.procesando && esTarjeta && (
        <FormTarjeta
          esCredito={state.metodoPago === 'TARJETA_CREDITO'}
          textoBoton={textoBoton}
          onPagar={pago.pagar}
        />
      )}
      {!pago.procesando && !esTarjeta && (
        <PagoSinTarjeta
          metodoPago={state.metodoPago}
          referencia={Math.round(state.pago.aPagar)}
          textoBoton={textoBoton}
          onPagar={pago.pagar}
        />
      )}
      {!pago.procesando && (
        <Link to="/checkout" className="pasarela-volver">
          ← Cambiar método de pago
        </Link>
      )}
    </section>
  )
}

export default PagoView
