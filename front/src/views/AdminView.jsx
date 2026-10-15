/*
  BORRAR ESTE COMENTARIO ANTES DE COMMITEAR (npm run lint marca error mientras esté)
  Para Fátima: Panel de administración
  - Imágenes: F09-admin-usuarios, F10-admin-eliminar, F11-admin-categorias, F12-admin-categoria-con-productos
  - Usuarios: GET /api/usuarios, PUT /api/usuarios/{id}/rol, PUT /api/usuarios/{id}/estado, DELETE /api/usuarios/{id} (con <Modal>)
  - Categorías: GET y POST /api/categorias, PUT y DELETE /api/categorias/{id}
  - Después de cada cambio, actualizar la lista con map o filter usando la respuesta, sin volver a hacer GET
  - Componentes sugeridos en components/admin/: TablaUsuarios, FilaUsuario, TablaCategorias, FormCategoria
*/
function AdminView({ usuario }) {
  return <h1 className="titulo-pagina">Panel de administración</h1>
}

export default AdminView
