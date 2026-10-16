function TablaCategorias({ categorias, onEditar, onBorrar }) {
  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Categoría padre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((c) => (
          <tr key={c.id}>
            <td>{c.nombre}</td>
            <td>{c.descripcion}</td>
            <td>{c.categoriaPadreNombre || '—'}</td>
            <td>
              <button className="boton boton-secundario" onClick={() => onEditar(c)}>
                Editar
              </button>{' '}
              <button className="boton" onClick={() => onBorrar(c)}>
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TablaCategorias