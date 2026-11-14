function VistaTarjeta({ datos, esCredito }) {
  return (
    <div className="vista-tarjeta">
      <div className="vista-tarjeta-arriba">
        <span className="chip" />
        <span>{esCredito ? 'CRÉDITO' : 'DÉBITO'}</span>
      </div>
      <p className="vista-tarjeta-numero">{datos.numero || '•••• •••• •••• ••••'}</p>
      <div className="vista-tarjeta-abajo">
        <span>{datos.nombre.toUpperCase() || 'NOMBRE Y APELLIDO'}</span>
        <span>{datos.vencimiento || 'MM/AA'}</span>
      </div>
    </div>
  )
}

export default VistaTarjeta
