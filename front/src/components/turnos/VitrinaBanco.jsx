import BarraStat from './BarraStat'
import FotoProducto from '../catalogo/FotoProducto'
import { nombreVehiculo } from './vehiculos'

function VitrinaBanco({ banco, bloqueado, vehiculo, onAnterior, onSiguiente }) {
  const ficha = banco.fichaTecnica

  return (
    <div className={bloqueado ? 'vitrina bloqueada' : 'vitrina'}>
      <div className="vitrina-foto">
        <button type="button" className="flecha" onClick={onAnterior} aria-label="Banco anterior">
          ‹
        </button>
        <FotoProducto ruta={banco.imagen} nombre={banco.nombre} />
        <button type="button" className="flecha" onClick={onSiguiente} aria-label="Banco siguiente">
          ›
        </button>
        {bloqueado && (
          <div className="candado">
            <span>🔒</span>
            <p>No admite {nombreVehiculo(vehiculo)}</p>
          </div>
        )}
      </div>
      <p className="tarjeta-categoria">
        {banco.categoria} · {banco.marca}
      </p>
      <h3 className="vitrina-nombre">{banco.nombre}</h3>
      <BarraStat nombre="Potencia máx." valor={ficha.potenciaMaximaHp} maximo={3000} unidad="HP" />
      <BarraStat
        nombre="Velocidad máx."
        valor={ficha.velocidadMaximaKmh}
        maximo={320}
        unidad="km/h"
      />
      <BarraStat nombre="Rodillo" valor={ficha.diametroRodilloMm} maximo={500} unidad="mm" />
      <p className="vitrina-traccion">Tracción: {ficha.tipoTraccion || '—'}</p>
      <div className="vitrina-compatibles">
        {banco.vehiculosCompatibles.map((id) => (
          <span key={id} className={id === vehiculo ? 'compatible activo' : 'compatible'}>
            {nombreVehiculo(id)}
          </span>
        ))}
      </div>
    </div>
  )
}

export default VitrinaBanco
