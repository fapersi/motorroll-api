/*
  BORRAR ESTE COMENTARIO ANTES DE COMMITEAR (npm run lint marca error mientras esté)
  Para Thiago: Detalle del producto
  - Imágenes: T04-detalle-comprador, T05-detalle-invitado, T06-detalle-sin-stock, T07-detalle-vendedor
  - useParams() para el id y GET /api/productos/{id} al montar
  - Botón "Agregar al carrito" dentro de <SoloRol usuario={usuario} roles={["COMPRADOR"]}>
  - Sin sesión: botón "Ingresá para comprar" que hace navigate("/login", { state: { desde: location.pathname } })
  - Sin stock (hayStock false): cartel y botón deshabilitado
  - Agregar: pedir("/api/carrito/items", { method: "POST", body: { productoId, cantidad } }) y <Aviso tipo="exito">
  - Componentes sugeridos en components/catalogo/: Galeria, FichaTecnica, AgregarAlCarrito
*/
function DetalleView({ usuario }) {
  return <h1 className="titulo-pagina">Detalle del producto</h1>
}

export default DetalleView
