import SoloRol from '../SoloRol'
import BotonCarrito from './BotonCarrito'
import Campana from '../notificaciones/Campana'

function AtajosUsuario({ usuario, onNavegar }) {
  return (
    <div className="navbar-atajos">
      <SoloRol usuario={usuario} roles={['COMPRADOR', 'VENDEDOR']}>
        <Campana onNavegar={onNavegar} />
      </SoloRol>
      <SoloRol usuario={usuario} roles={['COMPRADOR']}>
        <BotonCarrito onNavegar={onNavegar} />
      </SoloRol>
    </div>
  )
}

export default AtajosUsuario
