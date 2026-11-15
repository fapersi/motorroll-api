import FilaUsuario from './FilaUsuario'

function TablaUsuarios({ usuarios, miId, ocupado, onRol, onEstado, onEliminar }) {
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
        {usuarios.map((usuario) => (
          <FilaUsuario
            key={usuario.id}
            usuario={usuario}
            esYo={usuario.id === miId}
            ocupado={ocupado}
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
