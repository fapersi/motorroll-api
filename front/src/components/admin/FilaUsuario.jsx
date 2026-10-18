function FilaUsuario({ usuario, esYo, onRol, onEstado, onEliminar }) {
  return (
    <tr>
      <td>{usuario.username}</td>
      <td>{usuario.email}</td>
      <td>
        <select
          value={usuario.rol}
          disabled={esYo}
          onChange={(e) => onRol(usuario.id, e.target.value)}
        >
          <option value="COMPRADOR">COMPRADOR</option>
          <option value="VENDEDOR">VENDEDOR</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </td>
      <td>{usuario.activo ? 'Activo' : 'Deshabilitado'}</td>
      <td>
        <button
          className="boton boton-secundario"
          disabled={esYo}
          onClick={() => onEstado(usuario.id, !usuario.activo)}
        >
          {usuario.activo ? 'Deshabilitar' : 'Habilitar'}
        </button>{' '}
        <button
          className="boton"
          disabled={esYo || usuario.rol === 'ADMIN'}
          onClick={() => onEliminar(usuario)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default FilaUsuario