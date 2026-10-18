import { useState } from 'react'
import DetalleOrden from './DetalleOrden'
import { formatearFecha, formatearPrecio } from '../../utils/formato'

function TarjetaOrden({ orden }) {
  const [abierta, setAbierta] = useState(false)

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
      {abierta && <DetalleOrden items={orden.items} />}
    </article>
  )
}

export default TarjetaOrden
