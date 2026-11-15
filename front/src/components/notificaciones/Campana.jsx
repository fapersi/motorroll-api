import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icono from '../Icono'
import PanelNotificaciones from './PanelNotificaciones'
import { fetchNotificaciones, selectSinLeer } from '../../redux/notificacionSlice'

function Campana({ onNavegar }) {
  const dispatch = useDispatch()
  const { items, error, loading } = useSelector((state) => state.notificaciones)
  const sinLeer = useSelector(selectSinLeer)
  const [abierta, setAbierta] = useState(false)
  const texto = sinLeer === 1 ? '1 sin leer' : `${sinLeer} sin leer`

  useEffect(() => {
    if (items === null && error === null && !loading) dispatch(fetchNotificaciones())
  }, [dispatch, items, error, loading])

  function elegir() {
    setAbierta(false)
    onNavegar()
  }

  return (
    <div className="campana" onKeyDown={(e) => e.key === 'Escape' && setAbierta(false)}>
      <button
        type="button"
        className={abierta ? 'boton-campana abierta' : 'boton-campana'}
        aria-label={`Notificaciones: ${texto}`}
        aria-expanded={abierta}
        onClick={() => setAbierta(!abierta)}
      >
        <Icono nombre="campana" />
        {sinLeer > 0 && (
          <span key={sinLeer} className="contador-carrito">
            {sinLeer > 9 ? '9+' : sinLeer}
          </span>
        )}
      </button>
      {abierta && (
        <button
          type="button"
          className="capa-cierre"
          tabIndex={-1}
          aria-label="Cerrar notificaciones"
          onClick={() => setAbierta(false)}
        />
      )}
      {abierta && <PanelNotificaciones items={items} error={error} onElegir={elegir} />}
    </div>
  )
}

export default Campana
