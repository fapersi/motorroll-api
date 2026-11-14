import FotoProducto from '../catalogo/FotoProducto'
import VitrinaBanco from './VitrinaBanco'
import { admite } from './vehiculos'

function GarajeBancos({ bancos, bancoId, vehiculo, onElegir }) {
  const indice = Math.max(
    0,
    bancos.findIndex((b) => b.id === bancoId),
  )
  const banco = bancos[indice]
  const claseMiniatura = (b) =>
    ['miniatura-banco', b.id === banco.id && 'activa', !admite(b, vehiculo) && 'bloqueada']
      .filter(Boolean)
      .join(' ')
  const mover = (paso) => onElegir(bancos[(indice + paso + bancos.length) % bancos.length].id)

  return (
    <div className="garaje">
      <VitrinaBanco
        banco={banco}
        bloqueado={!admite(banco, vehiculo)}
        vehiculo={vehiculo}
        onAnterior={() => mover(-1)}
        onSiguiente={() => mover(1)}
      />
      <div className="tira-bancos">
        {bancos.map((b) => (
          <button
            key={b.id}
            type="button"
            title={b.nombre}
            className={claseMiniatura(b)}
            onClick={() => onElegir(b.id)}
          >
            <FotoProducto ruta={b.imagen} nombre={b.nombre} />
            {!admite(b, vehiculo) && <span className="mini-candado">🔒</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GarajeBancos
