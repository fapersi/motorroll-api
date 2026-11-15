import { Routes, Route } from 'react-router-dom'
import RutaPrivada from './RutaPrivada'
import CatalogoView from '../views/CatalogoView'
import DetalleView from '../views/DetalleView'
import PanelVendedorView from '../views/PanelVendedorView'
import LoginView from '../views/LoginView'
import RegistroView from '../views/RegistroView'
import PerfilView from '../views/PerfilView'
import AdminView from '../views/AdminView'
import CarritoView from '../views/CarritoView'
import CheckoutView from '../views/CheckoutView'
import OrdenesView from '../views/OrdenesView'
import PagoView from '../views/PagoView'
import TurnosView from '../views/TurnosView'
import TiendaView from '../views/TiendaView'
import DisenoTiendaView from '../views/DisenoTiendaView'
import NosotrosView from '../views/NosotrosView'
import SinPermisoView from '../views/SinPermisoView'
import NoEncontradoView from '../views/NoEncontradoView'

function Rutas() {
  const privada = (vista, roles) => <RutaPrivada roles={roles}>{vista}</RutaPrivada>

  return (
    <Routes>
      <Route path="/" element={<CatalogoView />} />
      <Route path="/producto/:id" element={<DetalleView />} />
      <Route path="/nosotros" element={<NosotrosView />} />
      <Route path="/tienda/:vendedor" element={<TiendaView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/registro" element={<RegistroView />} />
      <Route path="/perfil" element={privada(<PerfilView />)} />
      <Route path="/carrito" element={privada(<CarritoView />, ['COMPRADOR'])} />
      <Route path="/checkout" element={privada(<CheckoutView />, ['COMPRADOR'])} />
      <Route path="/pago" element={privada(<PagoView />, ['COMPRADOR'])} />
      <Route path="/ordenes" element={privada(<OrdenesView />, ['COMPRADOR'])} />
      <Route path="/turnos" element={privada(<TurnosView />, ['COMPRADOR'])} />
      <Route path="/vendedor" element={privada(<PanelVendedorView />, ['VENDEDOR'])} />
      <Route path="/vendedor/diseno" element={privada(<DisenoTiendaView />, ['VENDEDOR'])} />
      <Route path="/admin" element={privada(<AdminView />, ['ADMIN'])} />
      <Route path="/sin-permiso" element={<SinPermisoView />} />
      <Route path="*" element={<NoEncontradoView />} />
    </Routes>
  )
}

export default Rutas
