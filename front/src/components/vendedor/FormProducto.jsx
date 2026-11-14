import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CamposProducto from './CamposProducto'
import { armarProducto, datosIniciales, TIPOS_DE_FOTO, validarProducto } from './datosProducto'
import { createProducto, updateProducto } from '../../redux/productoSlice'

function FormProducto({ producto, categorias, onCerrar }) {
  const dispatch = useDispatch()
  const guardando = useSelector((state) => state.productos.loading)
  const [datos, setDatos] = useState(datosIniciales(producto))
  const [fotos, setFotos] = useState([])
  const [errores, setErrores] = useState({})

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function guardar() {
    const cambios = { ...armarProducto(datos), fotos }
    const accion = producto
      ? updateProducto({ id: producto.id, ...cambios })
      : createProducto(cambios)
    dispatch(accion).then((resultado) => {
      if (!resultado.error) onCerrar()
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
        <input
          type="file"
          accept={TIPOS_DE_FOTO.join(',')}
          multiple
          onChange={(e) => setFotos(Array.from(e.target.files))}
        />
        {errores.fotos && <span className="campo-error">{errores.fotos}</span>}
      </label>
      <div className="formulario-botones">
        <button className="boton" disabled={guardando}>
          {producto ? 'Guardar cambios' : 'Publicar'}
        </button>
        <button type="button" className="boton boton-secundario" onClick={onCerrar}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default FormProducto
