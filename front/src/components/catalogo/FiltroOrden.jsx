const ORDENES = [
  { valor: '', texto: 'Más nuevos' },
  { valor: 'precio_asc', texto: 'Menor precio' },
  { valor: 'precio_desc', texto: 'Mayor precio' },
  { valor: 'nombre', texto: 'Nombre (A-Z)' },
]

function FiltroOrden({ valor, onElegir }) {
  return (
    <label className="filtro">
      Ordenar por
      <select value={valor} onChange={(e) => onElegir(e.target.value)}>
        {ORDENES.map((orden) => (
          <option key={orden.valor} value={orden.valor}>
            {orden.texto}
          </option>
        ))}
      </select>
    </label>
  )
}

export default FiltroOrden
