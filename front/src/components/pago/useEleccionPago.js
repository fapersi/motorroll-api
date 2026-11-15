import { useState } from 'react'
import { calcularPago } from '../../utils/puntos'

const LARGO_MINIMO = 8

export function useEleccionPago(total, anterior) {
  const [metodo, setMetodo] = useState(anterior ? anterior.metodoPago : null)
  const [cuotas, setCuotas] = useState(anterior ? anterior.cuotas : 1)
  const [usarPuntos, setUsarPuntos] = useState(anterior ? anterior.usarPuntos : false)
  const [direccion, setDireccion] = useState(anterior ? anterior.direccionEnvio : '')
  const pago = calcularPago(total, usarPuntos)
  const cuotasFinales = metodo === 'TARJETA_CREDITO' ? cuotas : 1
  const faltaDireccion = direccion.trim().length < LARGO_MINIMO

  function textoDelBoton() {
    if (faltaDireccion) return 'Completá la dirección'
    if (metodo === null) return 'Elegí cómo pagar'
    return 'Pagar'
  }

  return {
    metodo,
    cuotas,
    usarPuntos,
    direccion,
    pago,
    cuotasFinales,
    incompleto: faltaDireccion || metodo === null,
    textoDelBoton: textoDelBoton(),
    datosDelPago: {
      metodoPago: metodo,
      cuotas: cuotasFinales,
      usarPuntos,
      direccionEnvio: direccion.trim(),
      pago,
    },
    setMetodo,
    setCuotas,
    setUsarPuntos,
    setDireccion,
  }
}
