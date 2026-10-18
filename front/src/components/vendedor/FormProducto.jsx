import { useState } from 'react'
import Campo from '../Campo'
import OpcionesCategoria from '../catalogo/OpcionesCategoria'
import { armarProducto, datosIniciales, validarProducto } from './datosProducto'

function FormProducto({ producto, categorias, onEnviar, onCancelar }) {
  const [datos, setDatos] = useState(datosIniciales(producto))
  const [fotos, setFotos] = useState([])
  const [errores, setErrores] = useState({})

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()
    const encontrados = validarProducto(datos, fotos, !producto)
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return
    onEnviar(armarProducto(datos), fotos)
  }

  return (
    <form className="formulario formulario-producto" onSubmit={enviar} noValidate>
      <h2>{producto ? `Editar ${producto.nombre}` : 'Nueva publicación'}</h2>
      <Campo etiqueta="Nombre" name="nombre" value={datos.nombre} onChange={cambiar} error={errores.nombre} />
      <label className="campo">
        Descripción
        <textarea name="descripcion" rows="4" value={datos.descripcion} onChange={cambiar} />
        {errores.descripcion && <span className="campo-error">{errores.descripcion}</span>}
      </label>
      <Campo etiqueta="Precio (US$)" name="precio" type="number" value={datos.precio} onChange={cambiar} error={errores.precio} />
      <Campo etiqueta="Stock" name="stock" type="number" value={datos.stock} onChange={cambiar} error={errores.stock} />
      <Campo etiqueta="Descuento (%)" name="descuento" type="number" value={datos.descuento} onChange={cambiar} error={errores.descuento} />
      <Campo etiqueta="Marca" name="marca" value={datos.marca} onChange={cambiar} />
      <label className="campo">
        Categoría
        <select name="categoriaId" value={datos.categoriaId} onChange={cambiar}>
          <option value="">Elegí una categoría</option>
          <OpcionesCategoria categorias={categorias} />
        </select>
        {errores.categoriaId && <span className="campo-error">{errores.categoriaId}</span>}
      </label>
      <label className="campo">
        {producto ? 'Agregar fotos' : 'Fotos'}
        <input type="file" accept="image/*" multiple onChange={(e) => setFotos(Array.from(e.target.files))} />
        {errores.fotos && <span className="campo-error">{errores.fotos}</span>}
      </label>
      <div className="formulario-botones">
        <button className="boton">{producto ? 'Guardar cambios' : 'Publicar'}</button>
        <button type="button" className="boton boton-secundario" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default FormProducto
