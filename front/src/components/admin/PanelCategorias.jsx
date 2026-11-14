import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aviso from '../Aviso'
import Cargando from '../Cargando'
import Modal from '../Modal'
import FormCategoria from './FormCategoria'
import TablaCategorias from './TablaCategorias'
import {
  createCategoria,
  deleteCategoria,
  fetchCategorias,
  limpiarError,
  updateCategoria,
} from '../../redux/categoriaSlice'

function PanelCategorias() {
  const dispatch = useDispatch()
  const { items, cargado, error } = useSelector((state) => state.categorias)
  const [editando, setEditando] = useState(null)
  const [aBorrar, setABorrar] = useState(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    if (!cargado) dispatch(fetchCategorias())
  }, [dispatch, cargado])

  function guardar(categoria) {
    const accion = editando
      ? updateCategoria({ id: editando.id, ...categoria })
      : createCategoria(categoria)
    dispatch(accion).then((resultado) => {
      if (resultado.error) return
      setEditando(null)
      setVersion(version + 1)
    })
  }

  function borrar() {
    dispatch(deleteCategoria(aBorrar.id))
    setABorrar(null)
  }

  if (!cargado) return error ? <Aviso mensaje={error} /> : <Cargando />

  return (
    <>
      <Aviso mensaje={error} onCerrar={() => dispatch(limpiarError())} />
      <FormCategoria
        key={editando ? `editar-${editando.id}` : `nueva-${version}`}
        categoria={editando}
        categorias={items}
        onEnviar={guardar}
        onCancelar={() => setEditando(null)}
      />
      <TablaCategorias categorias={items} onEditar={setEditando} onBorrar={setABorrar} />
      {aBorrar && (
        <Modal
          titulo={`¿Borrar la categoría ${aBorrar.nombre}?`}
          onConfirmar={borrar}
          onCancelar={() => setABorrar(null)}
        />
      )}
    </>
  )
}

export default PanelCategorias
