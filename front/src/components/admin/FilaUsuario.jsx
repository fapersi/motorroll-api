function FilaUsuario({ usuario, esYo, ocupado, onRol, onEstado, onEliminar }) {
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
          aria-label={`Rol de ${usuario.username}`}
          value={usuario.rol}
          disabled={esYo || ocupado}
          onChange={(e) => onRol(usuario, e.target.value)}
        >
          <option value="COMPRADOR">Comprador</option>
          <option value="VENDEDOR">Vendedor</option>
          <option value="ADMIN">Administrador</option>
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
            disabled={esYo || ocupado}
            onClick={() => onEstado(usuario.id, !usuario.activo)}
          >
            {usuario.activo ? 'Deshabilitar' : 'Habilitar'}
          </button>
          <button
            className="boton-accion boton-accion-rojo"
            disabled={esYo || ocupado || usuario.rol === 'ADMIN'}
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
