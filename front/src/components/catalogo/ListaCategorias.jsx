function ListaCategorias({ elegidas, categorias, onCambiar }) {
  const padres = categorias.filter((categoria) => !categoria.categoriaPadreId)
  const hijas = (padre) => categorias.filter((categoria) => categoria.categoriaPadreId === padre.id)

  function alternar(id) {
    onCambiar(elegidas.includes(id) ? elegidas.filter((otra) => otra !== id) : [...elegidas, id])
  }

  return (
    <div className="lista-categorias">
      {padres.map((padre) => (
        <div key={padre.id} className="grupo-categorias">
          <label className="opcion-categoria">
            <input
              type="checkbox"
              checked={elegidas.includes(padre.id)}
              onChange={() => alternar(padre.id)}
            />
            {padre.nombre}
          </label>
          {hijas(padre).map((hija) => (
            <label key={hija.id} className="opcion-categoria hija">
              <input
                type="checkbox"
                checked={elegidas.includes(padre.id) || elegidas.includes(hija.id)}
                disabled={elegidas.includes(padre.id)}
                onChange={() => alternar(hija.id)}
              />
              {hija.nombre}
            </label>
          ))}
        </div>
      ))}
      <button
        type="button"
        className="boton boton-secundario boton-chico"
        disabled={elegidas.length === 0}
        onClick={() => onCambiar([])}
      >
        Mostrar todas
      </button>
    </div>
  )
}

export default ListaCategorias
