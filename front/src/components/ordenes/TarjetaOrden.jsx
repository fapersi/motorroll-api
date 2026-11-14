import { useState } from 'react'
import DetalleOrden from './DetalleOrden'
import { buscarMetodo } from '../pago/metodosDePago'
import { formatearFecha, formatearPrecio } from '../../utils/formato'

function TarjetaOrden({ orden }) {
  const [abierta, setAbierta] = useState(false)
  const metodo = orden.metodoPago ? buscarMetodo(orden.metodoPago) : null

  return (
    <article className="tarjeta orden">
      <div className="orden-cabecera">
        <h2>Orden #{orden.id}</h2>
        <span>{formatearFecha(orden.fecha)}</span>
        <span className="etiqueta-estado">{orden.estado}</span>
        <span className="precio">{formatearPrecio(orden.total)}</span>
        <button className="boton boton-secundario" onClick={() => setAbierta(!abierta)}>
          {abierta ? 'Ocultar detalle' : 'Ver detalle'}
        </button>
      </div>
      <div className="orden-pago">
        {metodo && (
          <span>
            {metodo.icono} {metodo.titulo}
            {orden.cuotas > 1 && ` · ${orden.cuotas} cuotas`}
          </span>
        )}
        {orden.direccionEnvio && <span>Entrega: {orden.direccionEnvio}</span>}
        {orden.descuentoPorPuntos > 0 && (
          <span>Ahorraste {formatearPrecio(orden.descuentoPorPuntos)} con puntos</span>
        )}
        {orden.puntosGanados > 0 && (
          <span className="puntos-ganados">+{orden.puntosGanados} pts</span>
        )}
      </div>
      {abierta && <DetalleOrden items={orden.items} />}
    </article>
  )
}

export default TarjetaOrden
