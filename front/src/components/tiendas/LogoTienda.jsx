import { urlImagen } from '../../utils/api'
import { estiloDeMarca, iniciales } from '../../utils/colores'

function LogoTienda({ tienda, tamanio = 'mediano' }) {
  return (
    <span className={`logo-tienda logo-tienda-${tamanio}`} style={estiloDeMarca(tienda)}>
      {tienda.logo ? (
        <img src={urlImagen(tienda.logo)} alt={`Logo de ${tienda.nombre}`} />
      ) : (
        <span aria-hidden="true">{iniciales(tienda.nombre)}</span>
      )}
    </span>
  )
}

export default LogoTienda
