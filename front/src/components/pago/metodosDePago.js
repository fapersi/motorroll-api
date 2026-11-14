export const METODOS = [
  { id: 'TARJETA_CREDITO', titulo: 'Tarjeta de crédito', detalle: 'Hasta 12 cuotas', icono: '💳' },
  {
    id: 'TARJETA_DEBITO',
    titulo: 'Tarjeta de débito',
    detalle: 'Se debita al instante',
    icono: '🏧',
  },
  { id: 'TRANSFERENCIA', titulo: 'Transferencia', detalle: 'CBU o alias', icono: '🏦' },
  {
    id: 'BILLETERA_VIRTUAL',
    titulo: 'Billetera virtual',
    detalle: 'Pagá escaneando un QR',
    icono: '📱',
  },
  { id: 'EFECTIVO', titulo: 'Efectivo', detalle: 'Cupón para pagar en caja', icono: '💵' },
]

export const CUOTAS = [1, 3, 6, 12]

export function buscarMetodo(id) {
  return METODOS.find((metodo) => metodo.id === id)
}
