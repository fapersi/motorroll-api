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
import NosotrosView from '../views/NosotrosView'
import SinPermisoView from '../views/SinPermisoView'
import NoEncontradoView from '../views/NoEncontradoView'

function Rutas({ usuario, onLogin }) {
  const privada = (vista, roles) => (
    <RutaPrivada usuario={usuario} roles={roles}>
      {vista}
    </RutaPrivada>
  )

  return (
    <Routes>
      <Route path="/" element={<CatalogoView />} />
      <Route path="/producto/:id" element={<DetalleView usuario={usuario} />} />
      <Route path="/nosotros" element={<NosotrosView />} />
      <Route path="/login" element={<LoginView onLogin={onLogin} />} />
      <Route path="/registro" element={<RegistroView onLogin={onLogin} />} />
      <Route path="/perfil" element={privada(<PerfilView onLogin={onLogin} />)} />
      <Route path="/carrito" element={privada(<CarritoView />, ['COMPRADOR'])} />
      <Route path="/checkout" element={privada(<CheckoutView />, ['COMPRADOR'])} />
      <Route path="/ordenes" element={privada(<OrdenesView />, ['COMPRADOR'])} />
      <Route path="/vendedor" element={privada(<PanelVendedorView />, ['VENDEDOR', 'ADMIN'])} />
      <Route path="/admin" element={privada(<AdminView usuario={usuario} />, ['ADMIN'])} />
      <Route path="/sin-permiso" element={<SinPermisoView usuario={usuario} />} />
      <Route path="*" element={<NoEncontradoView />} />
    </Routes>
  )
}

export default Rutas
