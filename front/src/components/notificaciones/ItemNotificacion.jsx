import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Icono from '../Icono'
import { marcarLeida } from '../../redux/notificacionSlice'
import { haceCuanto } from '../../utils/tiempo'

function ItemNotificacion({ aviso, onElegir }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function abrir() {
    if (!aviso.leida) dispatch(marcarLeida(aviso.id))
    if (aviso.enlace) navigate(aviso.enlace)
    onElegir()
  }

  return (
    <li>
      <button
        type="button"
        className={aviso.leida ? 'notificacion' : 'notificacion sin-leer'}
        onClick={abrir}
      >
        <span className={`notificacion-icono notificacion-${aviso.tipo.toLowerCase()}`}>
          <Icono nombre={aviso.tipo} />
        </span>
        <span className="notificacion-texto">
          <strong>{aviso.titulo}</strong>
          <span>{aviso.mensaje}</span>
          <small>{haceCuanto(aviso.fecha)}</small>
        </span>
      </button>
    </li>
  )
}

export default ItemNotificacion
