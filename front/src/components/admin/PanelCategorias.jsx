import { useEffect, useState } from 'react'
import Aviso from '../Aviso'
import Cargando from '../Cargando'
import Modal from '../Modal'
import FormCategoria from './FormCategoria'
import TablaCategorias from './TablaCategorias'
import conCambios from './conCambios'
import {
  borrarCategoria,
  guardarCategoria,
  listarCategorias,
} from '../../services/categoriasService'

function PanelCategorias() {
  const [categorias, setCategorias] = useState(null)
  const [error, setError] = useState(null)
  const [editando, setEditando] = useState(null)
  const [aBorrar, setABorrar] = useState(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .catch((e) => setError(e.message))
  }, [])

  function guardar(datos) {
    setError(null)
    guardarCategoria(editando ? editando.id : null, datos)
      .then((guardada) => {
        setCategorias(editando ? conCambios(categorias, guardada) : [...categorias, guardada])
        setEditando(null)
        setVersion(version + 1)
      })
      .catch((e) => setError(e.message))
  }

  function borrar() {
    setError(null)
    borrarCategoria(aBorrar.id)
      .then(() => setCategorias(categorias.filter((c) => c.id !== aBorrar.id)))
      .catch((e) => setError(e.message))
      .finally(() => setABorrar(null))
  }

  if (!categorias) return error ? <Aviso mensaje={error} /> : <Cargando />

  return (
    <>
      <Aviso mensaje={error} onCerrar={() => setError(null)} />
      <FormCategoria
        key={editando ? `editar-${editando.id}` : `nueva-${version}`}
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
