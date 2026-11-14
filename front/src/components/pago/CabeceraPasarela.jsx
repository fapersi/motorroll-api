import { buscarMetodo } from './metodosDePago'
import { formatearPrecio } from '../../utils/formato'

function CabeceraPasarela({ metodoPago, aPagar, cuotas }) {
  const metodo = buscarMetodo(metodoPago)

  return (
    <>
      <header className="pasarela-cabecera">
        <span className="pasarela-marca">MotorPay</span>
        <span>Pago seguro · simulación</span>
      </header>
      <div className="pasarela-monto">
        <span>
          {metodo.icono} {metodo.titulo}
        </span>
        <strong>{formatearPrecio(aPagar)}</strong>
        {cuotas > 1 && (
          <span>
            {cuotas} cuotas de {formatearPrecio(aPagar / cuotas)}
          </span>
        )}
      </div>
    </>
  )
}

export default CabeceraPasarela
