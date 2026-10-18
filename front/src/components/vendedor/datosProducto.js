export const TIPOS_DE_FOTO = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

const PESO_MAXIMO = 5 * 1024 * 1024

export function datosIniciales(producto) {
  if (!producto) {
    return {
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      descuento: 0,
      marca: '',
      categoriaId: '',
    }
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

function errorDeFotos(fotos, esNuevo) {
  const tipoInvalido = fotos.some((foto) => !TIPOS_DE_FOTO.includes(foto.type))
  const muyPesada = fotos.some((foto) => foto.size > PESO_MAXIMO)
  if (esNuevo && fotos.length === 0) return 'Agregá al menos una foto'
  if (tipoInvalido) return 'Las fotos tienen que ser JPG, PNG, WEBP o GIF'
  if (muyPesada) return 'Cada foto puede pesar hasta 5 MB'
  return null
}

export function validarProducto(datos, fotos, esNuevo) {
  const errores = {}
  const precio = Number(datos.precio)
  const stock = Number(datos.stock)
  const descuento = Number(datos.descuento)
  const errorFotos = errorDeFotos(fotos, esNuevo)
  if (datos.nombre.trim() === '') errores.nombre = 'El nombre es obligatorio'
  if (datos.descripcion.trim() === '') errores.descripcion = 'La descripción es obligatoria'
  if (datos.precio === '' || precio <= 0) errores.precio = 'El precio tiene que ser mayor a cero'
  if (datos.stock === '' || stock < 0) errores.stock = 'El stock no puede ser negativo'
  if (descuento < 0 || descuento > 100) errores.descuento = 'Tiene que estar entre 0 y 100'
  if (datos.categoriaId === '') errores.categoriaId = 'Elegí una categoría'
  if (errorFotos) errores.fotos = errorFotos
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
