import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aviso from '../components/Aviso'
import Cargando from '../components/Cargando'
import EditorDiseno from '../components/tiendas/EditorDiseno'
import { fetchMiTienda, limpiarGuardada } from '../redux/tiendaSlice'

function DisenoTiendaView() {
  const dispatch = useDispatch()
  const { mia, error } = useSelector((state) => state.tiendas)

  useEffect(() => {
    if (mia === null) dispatch(fetchMiTienda())
  }, [dispatch, mia])

  useEffect(() => () => dispatch(limpiarGuardada()), [dispatch])

  if (!mia) return error ? <Aviso mensaje={error} /> : <Cargando />

  return (
    <section className="diseno-tienda">
      <h1 className="titulo-pagina">Diseño de mi tienda</h1>
      <p className="bajada">
        Elegí el nombre, los colores y el logo con los que te ven los compradores.
      </p>
      <EditorDiseno tienda={mia} />
    </section>
  )
}

export default DisenoTiendaView
