import { esPrecioValido, normalizarDecimal } from '../../utils/numeros'

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
  const stock = Number(datos.stock)
  const descuento = Number(datos.descuento)
  const errorFotos = errorDeFotos(fotos, esNuevo)
  if (datos.nombre.trim() === '') errores.nombre = 'El nombre es obligatorio'
  if (datos.descripcion.trim() === '') errores.descripcion = 'La descripción es obligatoria'
  if (!esPrecioValido(datos.precio)) {
    errores.precio = 'Escribí el precio en dólares, por ejemplo 48.500 o 1850,50'
  }
  if (esNuevo && (datos.stock === '' || stock < 0 || !Number.isInteger(stock))) {
    errores.stock = 'El stock tiene que ser un número entero, 0 o más'
  }
  if (descuento < 0 || descuento > 100) errores.descuento = 'Tiene que estar entre 0 y 100'
  if (datos.categoriaId === '') errores.categoriaId = 'Elegí una categoría'
  if (errorFotos) errores.fotos = errorFotos
  return errores
}

export function armarProducto(datos) {
  return {
    nombre: datos.nombre.trim(),
    descripcion: datos.descripcion.trim(),
    precio: Number(normalizarDecimal(datos.precio)),
    stock: Number(datos.stock),
    descuento: Number(datos.descuento),
    marca: datos.marca.trim(),
    categoriaId: Number(datos.categoriaId),
  }
}
