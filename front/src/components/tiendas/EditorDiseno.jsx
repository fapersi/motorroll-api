import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Aviso from '../Aviso'
import BannerTienda from './BannerTienda'
import FormDiseno from './FormDiseno'
import { useDiseno } from './useDiseno'
import { limpiarError, limpiarGuardada, updateLogo, updateMiTienda } from '../../redux/tiendaSlice'

const MENSAJES = {
  diseno: 'Listo: guardamos el diseño de tu tienda.',
  logo: 'Listo: actualizamos el logo. El nombre y los colores se guardan con Guardar diseño.',
}

function EditorDiseno({ tienda }) {
  const dispatch = useDispatch()
  const { loading, guardada, error } = useSelector((state) => state.tiendas)
  const diseno = useDiseno(tienda)

  function cambiar(campo, valor) {
    if (guardada) dispatch(limpiarGuardada())
    diseno.cambiar(campo, valor)
  }

  function guardar() {
    const datos = diseno.validar()
    if (datos) dispatch(updateMiTienda(datos))
  }

  return (
    <div className="diseno-columnas">
      <FormDiseno
        tienda={tienda}
        datos={diseno.datos}
        falta={diseno.falta}
        enviando={loading}
        onCambiar={cambiar}
        onGuardar={guardar}
        onLogo={(archivo) => dispatch(updateLogo(archivo))}
      >
        <Aviso mensaje={guardada ? MENSAJES[guardada] : null} tipo="exito" />
        <Aviso mensaje={error} onCerrar={() => dispatch(limpiarError())} />
      </FormDiseno>
      <div className="vista-previa">
        <p className="vista-previa-titulo">Así te ven los compradores</p>
        <BannerTienda tienda={{ ...tienda, ...diseno.datos }} Titulo="h2" />
        <Link to={`/tienda/${tienda.vendedor}`} className="boton boton-secundario">
          Ver mi tienda
        </Link>
      </div>
    </div>
  )
}

export default EditorDiseno
