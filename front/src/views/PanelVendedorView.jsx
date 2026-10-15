/*
  BORRAR ESTE COMENTARIO ANTES DE COMMITEAR (npm run lint marca error mientras esté)
  Para Thiago: Panel del vendedor
  - Imágenes: T08-panel-vendedor, T09-dar-de-baja, T10-publicar, T11-editar, T12-fotos
  - GET /api/productos/mis-publicaciones al montar
  - Publicar: POST /api/productos. Editar: PUT /api/productos/{id}. Formulario controlado con name igual al DTO
  - Stock: PATCH /api/productos/{id}/stock con { stock }. Descuento: PATCH .../descuento con { descuento }
  - Baja: <Modal> y DELETE /api/productos/{id}. Fotos: POST /api/productos/{id}/imagenes con FormData (campo "imagen")
  - Actualizar la lista con la respuesta, sin volver a hacer GET
  - Componentes sugeridos en components/vendedor/: TablaPublicaciones, FilaPublicacion, FormProducto, SubirFoto
*/
function PanelVendedorView({ usuario }) {
  return <h1 className="titulo-pagina">Panel del vendedor</h1>
}

export default PanelVendedorView
