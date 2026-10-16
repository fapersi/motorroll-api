import { useEffect, useState } from 'react'
import Aviso from '../Aviso'
import Cargando from '../Cargando'
import Modal from '../Modal'
import FormCategoria from './FormCategoria'
import TablaCategorias from './TablaCategorias'
import {
  borrarCategoria,
  crearCategoria,
  editarCategoria,
  listarCategorias,
} from '../../services/usuariosService'

function PanelCategorias() {
  const [categorias, setCategorias] = useState(null)
  const [error, setError] = useState('')
  const [editando, setEditando] = useState(null)
  const [aBorrar, setABorrar] = useState(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .catch((e) => setError(e.message))
  }, [])

  function terminar() {
    setEditando(null)
    setVersion(version + 1)
  }

  function guardar(datos) {
    setError('')
    if (editando) {
      editarCategoria(editando.id, datos)
        .then((nueva) => {
          setCategorias(categorias.map((c) => {
            if (c.id === nueva.id) return nueva
            if (c.categoriaPadreId === nueva.id) return { ...c, categoriaPadreNombre: nueva.nombre }
            return c
          }))
          terminar()
        })
        .catch((e) => setError(e.message))
      return
    }
    crearCategoria(datos)
      .then((nueva) => {
        setCategorias([...categorias, nueva])
        terminar()
      })
      .catch((e) => setError(e.message))
  }

  function borrar() {
    setError('')
    borrarCategoria(aBorrar.id)
      .then(() => setCategorias(categorias.filter((c) => c.id !== aBorrar.id)))
      .catch((e) => setError(e.message))
      .finally(() => setABorrar(null))
  }

  if (!categorias) return error ? <Aviso mensaje={error} /> : <Cargando />

  return (
    <>
      <Aviso mensaje={error} onCerrar={() => setError('')} />
      <FormCategoria
        key={`${editando?.id ?? 'nueva'}-${version}`}
        categoria={editando}
        categorias={categorias}
        onEnviar={guardar}
        onCancelar={() => setEditando(null)}
      />
      <TablaCategorias categorias={categorias} onEditar={setEditando} onBorrar={setABorrar} />
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