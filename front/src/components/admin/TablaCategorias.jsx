function TablaCategorias({ categorias, onEditar, onBorrar }) {
  return (
    <table className="tabla tabla-admin">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Categoría padre</th>
          <th className="celda-centrada">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria) => (
          <tr key={categoria.id}>
            <td>{categoria.nombre}</td>
            <td>{categoria.descripcion}</td>
            <td>{categoria.categoriaPadreNombre || '—'}</td>
            <td>
              <div className="acciones-fila">
                <button className="boton-accion" onClick={() => onEditar(categoria)}>
                  Editar
                </button>
                <button
                  className="boton-accion boton-accion-rojo"
                  onClick={() => onBorrar(categoria)}
                >
                  Borrar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TablaCategorias
