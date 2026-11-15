import { useDispatch, useSelector } from 'react-redux'
import { cambiarTema } from '../../redux/temaSlice'

const SOL = [
  'M12 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10',
  'M12 1v3M12 20v3M1 12h3M20 12h3',
  'M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1',
].join(' ')
const LUNA = 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5'

function BotonTema() {
  const dispatch = useDispatch()
  const claro = useSelector((state) => state.tema.modo === 'claro')

  return (
    <button
      className="boton-tema"
      onClick={() => dispatch(cambiarTema())}
      aria-label={claro ? 'Pasar a modo noche' : 'Pasar a modo día'}
      title={claro ? 'Modo noche' : 'Modo día'}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={claro ? LUNA : SOL} />
      </svg>
    </button>
  )
}

export default BotonTema
