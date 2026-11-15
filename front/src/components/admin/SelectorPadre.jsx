function SelectorPadre({ categoria, categorias, value, onChange }) {
  const tieneHijas = categorias.some((otra) => categoria && otra.categoriaPadreId === categoria.id)
  const opciones = categorias.filter(
    (opcion) => !opcion.categoriaPadreId && (!categoria || opcion.id !== categoria.id),
  )

  return (
    <label className="campo">
      Categoría padre
      <select name="categoriaPadreId" value={value} disabled={tieneHijas} onChange={onChange}>
        <option value="">Ninguna</option>
        {opciones.map((opcion) => (
          <option key={opcion.id} value={opcion.id}>
            {opcion.nombre}
          </option>
        ))}
      </select>
      {tieneHijas && <span className="campo-ayuda">Tiene subcategorías: va sin padre.</span>}
    </label>
  )
}

export default SelectorPadre
