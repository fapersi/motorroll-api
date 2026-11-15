import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aviso from '../Aviso'
import Cargando from '../Cargando'
import FormResena from './FormResena'
import ListaResenas from './ListaResenas'
import ResumenResenas from './ResumenResenas'
import { createResena, fetchResenas, limpiarError } from '../../redux/resenaSlice'

function SeccionResenas({ productoId }) {
  const dispatch = useDispatch()
  const usuario = useSelector((state) => state.usuario.sesion)
  const resenas = useSelector((state) => state.resenas)
  const [gracias, setGracias] = useState(null)
  const cargadas = resenas.resumen !== null && resenas.productoId === productoId

  useEffect(() => {
    if (!cargadas) dispatch(fetchResenas(productoId))
  }, [dispatch, productoId, cargadas])

  function publicar(resena) {
    dispatch(createResena({ productoId, ...resena })).then((accion) => {
      if (!accion.error) setGracias('¡Gracias por tu opinión!')
    })
  }

  if (!cargadas) return resenas.error ? <Aviso mensaje={resenas.error} /> : <Cargando />

  const esComprador = usuario !== null && usuario.rol === 'COMPRADOR'
  const opiniones = resenas.resumen.resenas
  const yaOpino =
    esComprador && opiniones.some((opinion) => opinion.autorUsername === usuario.username)
  const puedeOpinar = esComprador && !yaOpino && resenas.resumen.puedeOpinar

  return (
    <section className="seccion-resenas">
      <h2>Opiniones del producto</h2>
      <ResumenResenas resumen={resenas.resumen} />
      <Aviso mensaje={gracias} tipo="exito" onCerrar={() => setGracias(null)} />
      {esComprador && !yaOpino && !puedeOpinar && (
        <p className="nota-resena">Pueden opinar los talleres que compraron este equipo.</p>
      )}
      {puedeOpinar && (
        <FormResena
          onEnviar={publicar}
          enviando={resenas.loading}
          error={resenas.error}
          onCerrarError={() => dispatch(limpiarError())}
        />
      )}
      <ListaResenas resenas={opiniones} />
    </section>
  )
}

export default SeccionResenas
