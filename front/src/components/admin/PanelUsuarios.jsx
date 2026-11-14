import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aviso from '../Aviso'
import Cargando from '../Cargando'
import Modal from '../Modal'
import TablaUsuarios from './TablaUsuarios'
import {
  deleteUsuario,
  fetchUsuarios,
  limpiarError,
  updateEstado,
  updateRol,
} from '../../redux/usuarioSlice'

function PanelUsuarios() {
  const dispatch = useDispatch()
  const { sesion, lista, listaCargada, error } = useSelector((state) => state.usuario)
  const [aEliminar, setAEliminar] = useState(null)

  useEffect(() => {
    if (!listaCargada) dispatch(fetchUsuarios())
  }, [dispatch, listaCargada])

  function eliminar() {
    dispatch(deleteUsuario(aEliminar.id))
    setAEliminar(null)
  }

  return (
    <>
      <Aviso mensaje={error} onCerrar={() => dispatch(limpiarError())} />
      {!listaCargada && !error && <Cargando />}
      {listaCargada && (
        <TablaUsuarios
          usuarios={lista}
          miId={sesion.id}
          onRol={(id, rol) => dispatch(updateRol({ id, rol }))}
          onEstado={(id, activo) => dispatch(updateEstado({ id, activo }))}
          onEliminar={setAEliminar}
        />
      )}
      {aEliminar && (
        <Modal
          titulo={`¿Eliminar a ${aEliminar.username}?`}
          onConfirmar={eliminar}
          onCancelar={() => setAEliminar(null)}
        />
      )}
    </>
  )
}

export default PanelUsuarios
