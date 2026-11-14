import { PORCENTAJE_DEL_CANJE, PUNTOS_PARA_CANJE } from '../../utils/puntos'

function CanjePuntos({ puntos, usarPuntos, onCambiar }) {
  const alcanza = puntos >= PUNTOS_PARA_CANJE
  const progreso = Math.min(100, (puntos / PUNTOS_PARA_CANJE) * 100)

  return (
    <section className="tarjeta bloque-pago puntos">
      <div className="puntos-cabecera">
        <h2>Motorroll Puntos</h2>
        <span className="puntos-saldo">{puntos} pts</span>
      </div>
      <div className="barra barra-puntos">
        <span className="barra-relleno" style={{ width: `${progreso}%` }} />
      </div>
      {alcanza ? (
        <label className="interruptor">
          <input
            type="checkbox"
            checked={usarPuntos}
            onChange={(e) => onCambiar(e.target.checked)}
          />
          <span className="interruptor-pista" />
          Usar {PUNTOS_PARA_CANJE} puntos y llevarte {PORCENTAJE_DEL_CANJE}% OFF en esta compra
        </label>
      ) : (
        <p className="puntos-falta">
          Te faltan {PUNTOS_PARA_CANJE - puntos} puntos para tu {PORCENTAJE_DEL_CANJE}% de
          descuento.
        </p>
      )}
    </section>
  )
}

export default CanjePuntos
