import { useState } from 'react'
import { admite } from './vehiculos'

export function useEleccionTurno(bancos) {
  const [vehiculo, setVehiculo] = useState('AUTO')
  const [bancoId, setBancoId] = useState(null)
  const [fecha, setFecha] = useState(null)
  const [hora, setHora] = useState(null)
  const lista = bancos || []
  const primeroQueAdmite = (tipo) => lista.find((opcion) => admite(opcion, tipo)) || lista[0]
  const banco = lista.find((opcion) => opcion.id === bancoId) || primeroQueAdmite(vehiculo)

  function elegirVehiculo(nuevo) {
    setVehiculo(nuevo)
    if (banco && !admite(banco, nuevo)) elegirBanco(primeroQueAdmite(nuevo).id)
  }

  function elegirBanco(id) {
    setBancoId(id)
    setHora(null)
  }

  function elegirFecha(dia) {
    setFecha(dia)
    setHora(null)
  }

  const bloqueado = banco ? !admite(banco, vehiculo) : true
  const pedido = banco ? { bancoId: banco.id, fecha, hora, vehiculo } : null

  const elecciones = { elegirVehiculo, elegirBanco, elegirFecha, setHora }
  return { vehiculo, banco, fecha, hora, bloqueado, pedido, ...elecciones }
}
