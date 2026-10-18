export function datosIniciales(producto) {
  if (!producto) {
    return { nombre: '', descripcion: '', precio: '', stock: '', descuento: 0, marca: '', categoriaId: '' }
  }
  return {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: producto.stock,
    descuento: producto.descuento,
    marca: producto.marca || '',
    categoriaId: producto.categoriaId,
  }
}

export function validarProducto(datos, fotos, esNuevo) {
  const errores = {}
  if (datos.nombre.trim() === '') errores.nombre = 'El nombre es obligatorio'
  if (datos.descripcion.trim() === '') errores.descripcion = 'La descripción es obligatoria'
  if (datos.precio === '' || Number(datos.precio) <= 0) errores.precio = 'El precio tiene que ser mayor a cero'
  if (datos.stock === '' || Number(datos.stock) < 0) errores.stock = 'El stock no puede ser negativo'
  if (Number(datos.descuento) < 0 || Number(datos.descuento) > 100) errores.descuento = 'Tiene que estar entre 0 y 100'
  if (datos.categoriaId === '') errores.categoriaId = 'Elegí una categoría'
  if (esNuevo && fotos.length === 0) errores.fotos = 'Agregá al menos una foto'
  return errores
}

export function armarProducto(datos) {
  return {
    nombre: datos.nombre.trim(),
    descripcion: datos.descripcion.trim(),
    precio: Number(datos.precio),
    stock: Number(datos.stock),
    descuento: Number(datos.descuento),
    marca: datos.marca.trim(),
    categoriaId: Number(datos.categoriaId),
  }
}
