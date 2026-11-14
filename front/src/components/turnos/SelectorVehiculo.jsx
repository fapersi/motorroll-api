import { VEHICULOS } from './vehiculos'

function SelectorVehiculo({ vehiculo, bancos, onElegir }) {
  return (
    <div className="selector-vehiculo">
      {VEHICULOS.map((opcion) => {
        const cantidad = bancos.filter((b) => b.vehiculosCompatibles.includes(opcion.id)).length
        return (
          <button
            key={opcion.id}
            type="button"
            className={vehiculo === opcion.id ? 'vehiculo elegido' : 'vehiculo'}
            onClick={() => onElegir(opcion.id)}
          >
            <span className="vehiculo-icono">{opcion.icono}</span>
            <span className="vehiculo-nombre">{opcion.nombre}</span>
            <span className="vehiculo-bancos">
              {cantidad === 1 ? '1 banco' : `${cantidad} bancos`}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default SelectorVehiculo
