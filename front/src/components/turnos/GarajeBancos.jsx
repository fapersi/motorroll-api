import FotoProducto from '../catalogo/FotoProducto'
import VitrinaBanco from './VitrinaBanco'
import { admite } from './vehiculos'

function GarajeBancos({ bancos, bancoId, vehiculo, onElegir }) {
  const indice = Math.max(
    0,
    bancos.findIndex((opcion) => opcion.id === bancoId),
  )
  const banco = bancos[indice]
  const claseMiniatura = (opcion) =>
    [
      'miniatura-banco',
      opcion.id === banco.id && 'activa',
      !admite(opcion, vehiculo) && 'bloqueada',
    ]
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
        {bancos.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            title={opcion.nombre}
            className={claseMiniatura(opcion)}
            onClick={() => onElegir(opcion.id)}
          >
            <FotoProducto ruta={opcion.imagen} nombre={opcion.nombre} />
            {!admite(opcion, vehiculo) && (
              <span className="mini-candado" aria-hidden="true">
                🔒
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GarajeBancos
