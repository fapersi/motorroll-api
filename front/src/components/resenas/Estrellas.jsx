function Estrellas({ valor, tamanio = 'normal' }) {
  const relleno = `${Math.max(0, Math.min(5, valor)) * 20}%`

  return (
    <span className={`estrellas estrellas-${tamanio}`} aria-label={`${valor} de 5 estrellas`}>
      <span className="estrellas-fondo">★★★★★</span>
      <span className="estrellas-relleno" style={{ width: relleno }}>
        ★★★★★
      </span>
    </span>
  )
}

export default Estrellas
