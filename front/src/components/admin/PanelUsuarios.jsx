import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aviso from '../Aviso'
import Cargando from '../Cargando'
import ModalEliminar from './ModalEliminar'
import ModalRol from './ModalRol'
import TablaUsuarios from './TablaUsuarios'
import {
  deleteUsuario,
  fetchUsuarios,
  limpiarError,
  updateEstado,
  updateRol,
} from '../../redux/usuarioSlice'
import { useLimpiarAlSalir } from '../../hooks/useLimpiarAlSalir'

function PanelUsuarios() {
  const dispatch = useDispatch()
  const { sesion, lista, listaCargada, loading, error } = useSelector((state) => state.usuario)
  const [aEliminar, setAEliminar] = useState(null)
  const [cambioRol, setCambioRol] = useState(null)
  useLimpiarAlSalir(limpiarError)

  useEffect(() => {
    if (!listaCargada) dispatch(fetchUsuarios())
  }, [dispatch, listaCargada])

  function confirmarRol() {
    dispatch(updateRol({ id: cambioRol.usuario.id, rol: cambioRol.rol }))
    setCambioRol(null)
  }

  function eliminar() {
    dispatch(deleteUsuario(aEliminar.id))
    setAEliminar(null)
  }

  return (
    <>
      <Aviso mensaje={error} flotante onCerrar={() => dispatch(limpiarError())} />
      {!listaCargada && !error && <Cargando />}
      {listaCargada && (
        <TablaUsuarios
          usuarios={lista}
          miId={sesion.id}
          ocupado={loading}
          onRol={(usuario, rol) => setCambioRol({ usuario, rol })}
          onEstado={(id, activo) => dispatch(updateEstado({ id, activo }))}
          onEliminar={setAEliminar}
        />
      )}
      {cambioRol && (
        <ModalRol
          cambio={cambioRol}
          onConfirmar={confirmarRol}
          onCancelar={() => setCambioRol(null)}
        />
      )}
      {aEliminar && (
        <ModalEliminar
          usuario={aEliminar}
          onConfirmar={eliminar}
          onCancelar={() => setAEliminar(null)}
        />
      )}
    </>
  )
}

export default PanelUsuarios
