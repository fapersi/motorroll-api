import Campo from '../Campo'
import OpcionesCategoria from '../catalogo/OpcionesCategoria'

const CAMPOS = [
  { name: 'nombre', etiqueta: 'Nombre' },
  { name: 'precio', etiqueta: 'Precio (US$)', type: 'number' },
  { name: 'stock', etiqueta: 'Stock', type: 'number' },
  { name: 'descuento', etiqueta: 'Descuento (%)', type: 'number' },
  { name: 'marca', etiqueta: 'Marca' },
]

function CamposProducto({ datos, errores, categorias, onCambiar }) {
  return (
    <>
      {CAMPOS.map((campo) => (
        <Campo
          key={campo.name}
          etiqueta={campo.etiqueta}
          name={campo.name}
          type={campo.type}
          value={datos[campo.name]}
          onChange={onCambiar}
          error={errores[campo.name]}
        />
      ))}
      <label className="campo">
        Descripción
        <textarea name="descripcion" rows="4" value={datos.descripcion} onChange={onCambiar} />
        {errores.descripcion && <span className="campo-error">{errores.descripcion}</span>}
      </label>
      <label className="campo">
        Categoría
        <select name="categoriaId" value={datos.categoriaId} onChange={onCambiar}>
          <option value="">Elegí una categoría</option>
          <OpcionesCategoria categorias={categorias} />
        </select>
        {errores.categoriaId && <span className="campo-error">{errores.categoriaId}</span>}
      </label>
    </>
  )
}

export default CamposProducto
