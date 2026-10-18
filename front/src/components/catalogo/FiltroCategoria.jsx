import OpcionesCategoria from './OpcionesCategoria'

function FiltroCategoria({ valor, categorias, onElegir }) {
  return (
    <label className="filtro">
      Categoría
      <select value={valor} onChange={(e) => onElegir(e.target.value)}>
        <option value="">Todas</option>
        <OpcionesCategoria categorias={categorias} />
      </select>
    </label>
  )
}

export default FiltroCategoria
