import { useState } from 'react'
import Aviso from '../Aviso'
import CamposProducto from './CamposProducto'
import { armarProducto, datosIniciales, TIPOS_DE_FOTO, validarProducto } from './datosProducto'
import { guardarProducto } from '../../services/catalogoService'

function FormProducto({ producto, categorias, onGuardado, onCancelar }) {
  const [datos, setDatos] = useState(datosIniciales(producto))
  const [fotos, setFotos] = useState([])
  const [errores, setErrores] = useState({})
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function elegirFotos(e) {
    setFotos(Array.from(e.target.files))
  }

  function guardar() {
    setError(null)
    setGuardando(true)
    guardarProducto(producto ? producto.id : null, armarProducto(datos), fotos)
      .then(onGuardado)
      .catch((e) => {
        setError(e.message)
        setGuardando(false)
      })
  }

  function enviar(e) {
    e.preventDefault()
    const encontrados = validarProducto(datos, fotos, !producto)
    setErrores(encontrados)
    if (Object.keys(encontrados).length === 0) guardar()
  }

  return (
    <form className="formulario formulario-producto" onSubmit={enviar} noValidate>
      <h2>{producto ? `Editar ${producto.nombre}` : 'Nueva publicación'}</h2>
      <CamposProducto datos={datos} errores={errores} categorias={categorias} onCambiar={cambiar} />
      <label className="campo">
        {producto ? 'Agregar fotos' : 'Fotos'}
        <input type="file" accept={TIPOS_DE_FOTO.join(',')} multiple onChange={elegirFotos} />
        {errores.fotos && <span className="campo-error">{errores.fotos}</span>}
      </label>
      <Aviso mensaje={error} onCerrar={() => setError(null)} />
      <div className="formulario-botones">
        <button className="boton" disabled={guardando}>
          {producto ? 'Guardar cambios' : 'Publicar'}
        </button>
        <button type="button" className="boton boton-secundario" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default FormProducto
