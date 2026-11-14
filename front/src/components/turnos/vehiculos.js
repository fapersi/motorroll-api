export const VEHICULOS = [
  { id: 'AUTO', nombre: 'Auto', icono: '🚗' },
  { id: 'CAMIONETA_4X4', nombre: '4x4', icono: '🚙' },
  { id: 'MOTO', nombre: 'Moto', icono: '🏍️' },
  { id: 'CUATRICICLO', nombre: 'Cuatri', icono: '🛞' },
]

export function nombreVehiculo(id) {
  const vehiculo = VEHICULOS.find((v) => v.id === id)
  return vehiculo ? `${vehiculo.icono} ${vehiculo.nombre}` : id
}

export function admite(banco, vehiculo) {
  return banco.vehiculosCompatibles.includes(vehiculo)
}
