import Campo from '../Campo'
import OpcionesCategoria from '../catalogo/OpcionesCategoria'
import { formatearPrecio } from '../../utils/formato'
import { esPrecioValido, normalizarDecimal } from '../../utils/numeros'

const CAMPOS = [
  { name: 'nombre', etiqueta: 'Nombre' },
  { name: 'precio', etiqueta: 'Precio (US$)', inputMode: 'decimal' },
  { name: 'stock', etiqueta: 'Stock', type: 'number', min: 0 },
  { name: 'descuento', etiqueta: 'Descuento (%)', type: 'number', min: 0 },
  { name: 'marca', etiqueta: 'Marca' },
]

function ayudaDe(campo, datos) {
  if (campo.name === 'precio' && esPrecioValido(datos.precio)) {
    return `Se publica a ${formatearPrecio(Number(normalizarDecimal(datos.precio)))}`
  }
  return null
}

function CamposProducto({ datos, errores, categorias, esNuevo, onCambiar }) {
  const campos = CAMPOS.filter((campo) => esNuevo || campo.name !== 'stock')

  return (
    <>
      {campos.map((campo) => (
        <Campo
          key={campo.name}
          etiqueta={campo.etiqueta}
          name={campo.name}
          type={campo.type}
          min={campo.min}
          inputMode={campo.inputMode}
          ayuda={ayudaDe(campo, datos)}
          value={datos[campo.name]}
          onChange={onCambiar}
          error={errores[campo.name]}
        />
      ))}
      {!esNuevo && (
        <p className="campo-ayuda">
          El stock se cambia desde la tabla, así no se pisan las ventas.
        </p>
      )}
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
