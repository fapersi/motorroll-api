function DireccionEnvio({ direccion, onCambiar }) {
  return (
    <section className="tarjeta bloque-pago">
      <h2>¿Dónde lo entregamos?</h2>
      <label className="campo">
        Dirección de entrega
        <input
          value={direccion}
          maxLength="200"
          placeholder="Calle, número, localidad y provincia"
          onChange={(e) => onCambiar(e.target.value)}
        />
      </label>
    </section>
  )
}

export default DireccionEnvio
