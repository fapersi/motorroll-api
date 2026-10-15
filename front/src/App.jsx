import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { guardarSesion, obtenerToken, obtenerUsuario, obtenerVencimiento, cerrarSesion } from './utils/sesion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Rutas from './routes/Rutas'

const SESION_VENCIDA = { state: { aviso: 'Tu sesión venció. Volvé a ingresar.' } }

function App() {
  const [usuario, setUsuario] = useState(obtenerUsuario())
  const navigate = useNavigate()
  useLocation()
  const sesion = obtenerToken() ? usuario : null

  const iniciarSesion = (respuesta) => {
    guardarSesion(respuesta)
    setUsuario(respuesta.usuario)
  }

  const salir = () => {
    cerrarSesion()
    setUsuario(null)
  }

  useEffect(() => {
    if (!usuario) return
    const temporizador = setTimeout(() => {
      salir()
      navigate('/login', SESION_VENCIDA)
    }, obtenerVencimiento() - Date.now())
    return () => clearTimeout(temporizador)
  }, [usuario, navigate])

  return (
    <>
      <Navbar usuario={sesion} onSalir={salir} />
      <main className="contenido">
        <Rutas usuario={sesion} onLogin={iniciarSesion} />
      </main>
      <Footer />
    </>
  )
}

export default App
