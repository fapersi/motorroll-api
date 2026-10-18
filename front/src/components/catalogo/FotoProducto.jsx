import { urlImagen } from '../../utils/api'

function FotoProducto({ ruta, nombre }) {
  if (!ruta) return <div className="sin-foto">Sin foto</div>
  return <img src={urlImagen(ruta)} alt={nombre} />
}

export default FotoProducto
