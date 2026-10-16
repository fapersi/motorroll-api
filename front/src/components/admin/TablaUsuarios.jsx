import FilaUsuario from './FilaUsuario'

function TablaUsuarios({ usuarios, miId, onRol, onEstado, onEliminar }) {
  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Mail</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
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