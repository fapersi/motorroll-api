import FilaUsuario from './FilaUsuario'

function TablaUsuarios({ usuarios, miId, onRol, onEstado, onEliminar }) {
  return (
    <table className="tabla tabla-admin">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Mail</th>
          <th>Rol</th>
          <th className="celda-centrada">Estado</th>
          <th className="celda-centrada">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((u) => (
          <FilaUsuario
            key={u.id}
            usuario={u}
            esYo={u.id === miId}
            onRol={onRol}
            onEstado={onEstado}
            onEliminar={onEliminar}
          />
        ))}
      </tbody>
    </table>
  )
}

export default TablaUsuarios
