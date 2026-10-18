function conCambios(categorias, guardada) {
  return categorias.map((c) => {
    if (c.id === guardada.id) return guardada
    if (c.categoriaPadreId === guardada.id) return { ...c, categoriaPadreNombre: guardada.nombre }
    return c
  })
}

export default conCambios
