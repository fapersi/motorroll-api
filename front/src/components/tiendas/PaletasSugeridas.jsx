const PALETAS = [
  { nombre: 'Pista', colores: ['#eb333b', '#ffb21f'] },
  { nombre: 'Eléctrico', colores: ['#1f6fd1', '#22c1c9'] },
  { nombre: 'Boxes', colores: ['#198754', '#c9e265'] },
  { nombre: 'Turbo', colores: ['#f26b1d', '#2b2d33'] },
  { nombre: 'Carbono', colores: ['#1d1f24', '#d4a537'] },
  { nombre: 'Neón', colores: ['#7b3fe4', '#ff4fa3'] },
]

function PaletasSugeridas({ onElegir }) {
  return (
    <fieldset className="paletas">
      <legend>Paletas sugeridas</legend>
      {PALETAS.map((paleta) => (
        <button
          key={paleta.nombre}
          type="button"
          className="paleta"
          onClick={() => onElegir(paleta.colores[0], paleta.colores[1])}
        >
          <span
            className="paleta-muestra"
            style={{ '--muestra-1': paleta.colores[0], '--muestra-2': paleta.colores[1] }}
          />
          {paleta.nombre}
        </button>
      ))}
    </fieldset>
  )
}

export default PaletasSugeridas
