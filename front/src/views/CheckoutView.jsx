/*
  BORRAR ESTE COMENTARIO ANTES DE COMMITEAR (npm run lint marca error mientras esté)
  Para Tomás: Confirmar compra
  - Imagen: To05-checkout
  - Mostrar el resumen con el total que calcula el back (no recalcularlo en el front)
  - POST /api/carrito/checkout sin body: el usuario sale del token
  - Si sale bien: navigate("/ordenes") con un aviso de compra confirmada
  - Componentes sugeridos en components/carrito/: ResumenCompra
*/
function CheckoutView() {
  return <h1 className="titulo-pagina">Confirmar compra</h1>
}

export default CheckoutView
