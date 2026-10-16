import { useState } from 'react'

function FormCategoria({ categoria, categorias, onEnviar, onCancelar }) {
  const [datos, setDatos] = useState({
    nombre: categoria?.nombre ?? '',
    descripcion: categoria?.descripcion ?? '',
    categoriaPadreId: categoria?.categoriaPadreId ?? '',
  })
  const [error, setError] = useState('')

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()
    if (datos.nombre.trim() === '') {
      setError('El nombre es obligatorio')
      return
    }
    setError('')
    onEnviar({
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      categoriaPadreId: datos.categoriaPadreId === '' ? null : Number(datos.categoriaPadreId),
    })
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h2>{categoria ? 'Editar categoría' : 'Nueva categoría'}</h2>
      <label className="campo">
        Nombre
        <input name="nombre" value={datos.nombre} onChange={cambiar} />
        {error && <span className="campo-error">{error}</span>}
      </label>
      <label className="campo">
        Descripción
        <input name="descripcion" value={datos.descripcion} onChange={cambiar} />
      </label>
      <label className="campo">
        Categoría padre
        <select name="categoriaPadreId" value={datos.categoriaPadreId} onChange={cambiar}>
          <option value="">Ninguna</option>
          {categorias
            .filter((c) => c.id !== categoria?.id)
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
        </select>
      </label>
      <button className="boton">{categoria ? 'Guardar cambios' : 'Agregar'}</button>
      {categoria && (
        <button type="button" className="boton boton-secundario" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  )
}

export default FormCategoria