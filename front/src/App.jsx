import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { cerrarSesion } from './redux/usuarioSlice'
import { obtenerVencimiento } from './utils/sesion'
import { guardarTema } from './utils/tema'
import { SESION_VENCIDA } from './utils/api'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import RecordatorioTurno from './components/turnos/RecordatorioTurno'
import Rutas from './routes/Rutas'

function App() {
  const sesion = useSelector((state) => state.usuario.sesion)
  const tema = useSelector((state) => state.tema.modo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const arriba = useRef(null)

  useEffect(() => {
    arriba.current.scrollIntoView()
  }, [pathname])

  useEffect(() => {
    guardarTema(tema)
  }, [tema])

  useEffect(() => {
    if (!sesion) return
    const temporizador = setTimeout(() => {
      dispatch(cerrarSesion())
      navigate('/login', { state: { aviso: SESION_VENCIDA } })
    }, obtenerVencimiento() - Date.now())
    return () => clearTimeout(temporizador)
  }, [sesion, dispatch, navigate])

  return (
    <div className={`app tema-${tema}`}>
      <span ref={arriba} />
      <Navbar />
      <main className="contenido">
        <Rutas />
      </main>
      <Footer />
      {sesion && sesion.rol === 'COMPRADOR' && <RecordatorioTurno />}
    </div>
  )
}

export default App
