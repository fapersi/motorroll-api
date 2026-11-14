import { CUOTAS, METODOS } from './metodosDePago'
import { formatearPrecio } from '../../utils/formato'

function ElegirMetodo({ metodo, cuotas, aPagar, onMetodo, onCuotas }) {
  return (
    <section className="tarjeta bloque-pago">
      <h2>¿Cómo querés pagar?</h2>
      <div className="metodos-pago">
        {METODOS.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            className={metodo === opcion.id ? 'metodo-pago elegido' : 'metodo-pago'}
            onClick={() => onMetodo(opcion.id)}
          >
            <span className="metodo-icono">{opcion.icono}</span>
            <span className="metodo-titulo">{opcion.titulo}</span>
            <span className="metodo-detalle">{opcion.detalle}</span>
          </button>
        ))}
      </div>
      {metodo === 'TARJETA_CREDITO' && (
        <label className="campo">
          Cuotas sin interés
          <select value={cuotas} onChange={(e) => onCuotas(Number(e.target.value))}>
            {CUOTAS.map((numero) => (
              <option key={numero} value={numero}>
                {numero === 1 ? '1 pago' : `${numero} cuotas`} de {formatearPrecio(aPagar / numero)}
              </option>
            ))}
          </select>
        </label>
      )}
    </section>
  )
}

export default ElegirMetodo
