import { useDispatch } from 'react-redux'
import ItemNotificacion from './ItemNotificacion'
import { fetchNotificaciones, marcarTodasLeidas } from '../../redux/notificacionSlice'

function PanelNotificaciones({ items, error, onElegir }) {
  const dispatch = useDispatch()
  const haySinLeer = items !== null && items.some((aviso) => !aviso.leida)

  return (
    <div className="panel-notificaciones" role="dialog" aria-label="Notificaciones">
      <div className="panel-notificaciones-cabecera">
        <h2>Notificaciones</h2>
        {haySinLeer && (
          <button
            type="button"
            className="boton-texto"
            onClick={() => dispatch(marcarTodasLeidas())}
          >
            Marcar todas como leídas
          </button>
        )}
      </div>
      {items === null && error === null && <p className="vacio">Cargando…</p>}
      {items === null && error !== null && (
        <div className="vacio vacio-acciones">
          <p>No pudimos cargar tus avisos.</p>
          <button
            type="button"
            className="boton boton-chico"
            onClick={() => dispatch(fetchNotificaciones())}
          >
            Reintentar
          </button>
        </div>
      )}
      {items !== null && items.length === 0 && (
        <p className="vacio">
          Todavía no tenés notificaciones. Acá te avisamos de turnos, compras y ventas.
        </p>
      )}
      {items !== null && items.length > 0 && (
        <ul>
          {items.map((aviso) => (
            <ItemNotificacion key={aviso.id} aviso={aviso} onElegir={onElegir} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default PanelNotificaciones
