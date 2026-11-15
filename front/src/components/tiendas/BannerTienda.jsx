import LogoTienda from './LogoTienda'
import { estiloDeMarca } from '../../utils/colores'

function BannerTienda({ tienda, Titulo = 'h1' }) {
  const publicaciones = tienda.cantidadProductos === 1 ? 'publicación' : 'publicaciones'

  return (
    <header className="banner-tienda" style={estiloDeMarca(tienda)}>
      <LogoTienda tienda={tienda} tamanio="grande" />
      <div className="banner-tienda-texto">
        <p className="banner-tienda-sello">✓ Tienda oficial</p>
        <Titulo>{tienda.nombre}</Titulo>
        {tienda.eslogan && <p className="banner-tienda-eslogan">{tienda.eslogan}</p>}
        <p className="banner-tienda-dato">
          {tienda.cantidadProductos} {publicaciones}
        </p>
      </div>
    </header>
  )
}

export default BannerTienda
