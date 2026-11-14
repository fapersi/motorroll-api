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
        {categorias.map((c) => (
          <tr key={c.id}>
            <td>{c.nombre}</td>
            <td>{c.descripcion}</td>
            <td>{c.categoriaPadreNombre || '—'}</td>
            <td>
              <div className="acciones-fila">
                <button className="boton-accion" onClick={() => onEditar(c)}>
                  Editar
                </button>
                <button className="boton-accion boton-accion-rojo" onClick={() => onBorrar(c)}>
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
