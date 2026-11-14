function FilaUsuario({ usuario, esYo, onRol, onEstado, onEliminar }) {
  return (
    <tr>
      <td>
        {usuario.username}
        {esYo && <span className="etiqueta-yo">vos</span>}
      </td>
      <td>{usuario.email}</td>
      <td>
        <select
          className="selector-rol"
          value={usuario.rol}
          disabled={esYo}
          onChange={(e) => onRol(usuario.id, e.target.value)}
        >
          <option value="COMPRADOR">COMPRADOR</option>
          <option value="VENDEDOR">VENDEDOR</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </td>
      <td className="celda-centrada">
        <span
          className={usuario.activo ? 'pastilla pastilla-activa' : 'pastilla pastilla-inactiva'}
        >
          {usuario.activo ? 'Activo' : 'Deshabilitado'}
        </span>
      </td>
      <td>
        <div className="acciones-fila">
          <button
            className={usuario.activo ? 'boton-accion' : 'boton-accion boton-accion-verde'}
            disabled={esYo}
            onClick={() => onEstado(usuario.id, !usuario.activo)}
          >
            {usuario.activo ? 'Deshabilitar' : 'Habilitar'}
          </button>
          <button
            className="boton-accion boton-accion-rojo"
            disabled={esYo || usuario.rol === 'ADMIN'}
            onClick={() => onEliminar(usuario)}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}

export default FilaUsuario
