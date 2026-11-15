const portada = (producto) => {
  const primera = producto.imagenes.reduce(
    (elegida, imagen) => (elegida === null || imagen.orden < elegida.orden ? imagen : elegida),
    null,
  )
  return primera ? primera.url : null
}

export const aResumen = (producto) => ({
  id: producto.id,
  nombre: producto.nombre,
  marca: producto.marca,
  precio: producto.precio,
  precioFinal: producto.precioFinal,
  descuento: producto.descuento,
  stock: producto.stock,
  hayStock: producto.hayStock,
  esServicio: producto.esServicio,
  imagenPortada: portada(producto),
  categoriaId: producto.categoriaId,
  categoriaNombre: producto.categoriaNombre,
  vendedor: producto.vendedor,
  calificacion: producto.calificacion,
  cantidadResenas: producto.cantidadResenas,
})

export const descontarStock = (producto, vendidos) => {
  producto.stock = producto.stock - vendidos
  producto.hayStock = producto.stock > 0
}
