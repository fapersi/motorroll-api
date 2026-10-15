/*
  BORRAR ESTE COMENTARIO ANTES DE COMMITEAR (npm run lint marca error mientras esté)
  Para Tomás: Mi carrito
  - Imágenes: Imagenes de Tomas/To01-carrito, To02-carrito-sin-stock, To03-carrito-vaciar, To04-carrito-vacio
  - GET /api/carrito al montar. Si no hay ítems, mostrar "Tu carrito está vacío" antes de recorrer
  - Cantidad: PUT /api/carrito/items/{itemId} con { cantidad }. Eliminar: DELETE /api/carrito/items/{itemId}. Vaciar: <Modal> y DELETE /api/carrito
  - Cada operación devuelve el carrito actualizado: setCarrito(respuesta), sin otro GET
  - Error de stock (400): mostrar error.message en <Aviso>
  - Componentes sugeridos en components/carrito/: ItemCarrito, SelectorCantidad, ResumenCarrito
*/
function CarritoView() {
  return <h1 className="titulo-pagina">Mi carrito</h1>
}

export default CarritoView
