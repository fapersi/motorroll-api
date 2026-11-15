import Buscador from './Buscador'
import FiltroCategoria from './FiltroCategoria'
import FiltroPrecio from './FiltroPrecio'
import FiltroOrden from './FiltroOrden'

function Filtros({ filtros, categorias, onCambiar }) {
  const cambiar = (cambios) => onCambiar({ ...filtros, ...cambios })

  return (
    <section className="filtros">
      <Buscador
        key={filtros.texto}
        texto={filtros.texto}
        onBuscar={(texto) => cambiar({ texto })}
      />
      <FiltroCategoria
        elegidas={filtros.categorias}
        categorias={categorias}
        onCambiar={(elegidas) => cambiar({ categorias: elegidas })}
      />
      <FiltroPrecio
        key={`${filtros.precioMin}-${filtros.precioMax}`}
        minimo={filtros.precioMin}
        maximo={filtros.precioMax}
        onAplicar={(precioMin, precioMax) => cambiar({ precioMin, precioMax })}
      />
      <FiltroOrden valor={filtros.ordenarPor} onElegir={(ordenarPor) => cambiar({ ordenarPor })} />
    </section>
  )
}

export default Filtros
