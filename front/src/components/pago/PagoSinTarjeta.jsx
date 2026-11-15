import { useState } from 'react'
import CodigoQR from './CodigoQR'

const BOTONES = {
  TRANSFERENCIA: 'Ya transferí',
  BILLETERA_VIRTUAL: 'Ya pagué con el QR',
  EFECTIVO: 'Generar el cupón',
}

function Dato({ titulo, valor }) {
  return (
    <p className="dato-pago">
      <span>{titulo}</span>
      <strong>{valor}</strong>
    </p>
  )
}

function PagoSinTarjeta({ metodoPago, onPagar }) {
  const [referencia] = useState(() => Date.now() % 100000000)

  return (
    <div className="pago-sin-tarjeta">
      {metodoPago === 'TRANSFERENCIA' && (
        <>
          <p>Transferí el total a esta cuenta y después tocá el botón.</p>
          <Dato titulo="Titular" valor="Motorroll Power Test S.A." />
          <Dato titulo="Alias" valor="MOTORROLL.BANCOS.PAGO" />
          <Dato titulo="CBU" valor="0000003100099887766554" />
        </>
      )}
      {metodoPago === 'BILLETERA_VIRTUAL' && (
        <>
          <p>Escaneá el QR con la billetera que uses.</p>
          <CodigoQR semilla={referencia} />
        </>
      )}
      {metodoPago === 'EFECTIVO' && (
        <>
          <p>Presentá este código en cualquier caja de pago. Vence en 3 días.</p>
          <Dato titulo="Código de pago" valor={`MR-${String(referencia).padStart(8, '0')}`} />
        </>
      )}
      <p className="nota-segura">Es una simulación: no se mueve dinero real.</p>
      <button className="boton boton-grande" onClick={onPagar}>
        {BOTONES[metodoPago]}
      </button>
    </div>
  )
}

export default PagoSinTarjeta
