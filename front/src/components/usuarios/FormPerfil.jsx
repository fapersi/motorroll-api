import { useState } from 'react'

function FormPerfil({ usuario, onEnviar, cargando, children }) {
  const [datos, setDatos] = useState({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
  })
  const [incompleto, setIncompleto] = useState(false)

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()
    const limpios = {
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      email: datos.email.trim(),
    }
    if (limpios.nombre === '' || limpios.apellido === '' || limpios.email === '') {
      setIncompleto(true)
      return
    }
    setIncompleto(false)
    onEnviar(limpios)
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h1 className="titulo-pagina">Mi perfil</h1>
      <p>
        Usuario: <strong>{usuario.username}</strong> ·{' '}
        <span className="etiqueta-rol">{usuario.rol}</span>
      </p>
      {children}
      <label className="campo">
        Nombre
        <input name="nombre" value={datos.nombre} onChange={cambiar} />
      </label>
      <label className="campo">
        Apellido
        <input name="apellido" value={datos.apellido} onChange={cambiar} />
      </label>
      <label className="campo">
        Mail
        <input name="email" value={datos.email} onChange={cambiar} />
      </label>
      {incompleto && <p className="campo-error">Completá todos los campos</p>}
      <button className="boton" disabled={cargando}>
        {cargando ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </form>
  )
}

export default FormPerfil