import { useState } from 'react'

export function useDiseno(tienda) {
  const [datos, setDatos] = useState({
    nombre: tienda.nombre,
    eslogan: tienda.eslogan || '',
    colorPrincipal: tienda.colorPrincipal,
    colorSecundario: tienda.colorSecundario,
  })
  const [falta, setFalta] = useState(null)

  function cambiar(campo, valor) {
    setDatos((anteriores) => ({ ...anteriores, [campo]: valor }))
  }

  function validar() {
    if (datos.nombre.trim() === '') {
      setFalta('Poné el nombre de tu tienda')
      return null
    }
    setFalta(null)
    return { ...datos, nombre: datos.nombre.trim(), eslogan: datos.eslogan.trim() }
  }

  return { datos, falta, cambiar, validar }
}
