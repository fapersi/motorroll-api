export const DOLARES_POR_PUNTO = 100
export const PUNTOS_PARA_CANJE = 500
export const PORCENTAJE_DEL_CANJE = 10

export function calcularPago(total, usarPuntos) {
  const descuento = usarPuntos ? Math.round(total * PORCENTAJE_DEL_CANJE) / 100 : 0
  const aPagar = total - descuento
  return { subtotal: total, descuento, aPagar, ganados: Math.floor(aPagar / DOLARES_POR_PUNTO) }
}
