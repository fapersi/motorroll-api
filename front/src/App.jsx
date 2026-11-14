import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { cerrarSesion } from './redux/usuarioSlice'
import { obtenerVencimiento } from './utils/sesion'
import { SESION_VENCIDA } from './utils/api'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Rutas from './routes/Rutas'

function App() {
  const { sesion } = useSelector((state) => state.usuario)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const arriba = useRef(null)

  useEffect(() => {
    arriba.current.scrollIntoView()
  }, [pathname])

  useEffect(() => {
    if (!sesion) return
    const temporizador = setTimeout(() => {
      dispatch(cerrarSesion())
      navigate('/login', { state: { aviso: SESION_VENCIDA } })
    }, obtenerVencimiento() - Date.now())
    return () => clearTimeout(temporizador)
  }, [sesion, dispatch, navigate])

  return (
    <>
      <span ref={arriba} />
      <Navbar />
      <main className="contenido">
        <Rutas />
      </main>
      <Footer />
    </>
  )
}

export default App
