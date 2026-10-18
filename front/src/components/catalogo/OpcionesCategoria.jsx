function OpcionesCategoria({ categorias }) {
  return categorias.map((categoria) => (
    <option key={categoria.id} value={categoria.id}>
      {categoria.categoriaPadreNombre
        ? `${categoria.categoriaPadreNombre} / ${categoria.nombre}`
        : categoria.nombre}
    </option>
  ))
}

export default OpcionesCategoria
