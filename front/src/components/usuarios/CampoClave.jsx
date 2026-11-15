import { useState } from 'react'
import Icono from '../Icono'

function CampoClave({ valor, onCambiar }) {
  const [verClave, setVerClave] = useState(false)

  return (
    <label className="campo campo-icono">
      Contraseña
      <span className="input-con-icono">
        <Icono nombre="candado" />
        <input
          type={verClave ? 'text' : 'password'}
          name="password"
          autoComplete="current-password"
          placeholder="Tu contraseña"
          value={valor}
          onChange={onCambiar}
        />
        <button
          type="button"
          className="ver-clave"
          aria-label={verClave ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          onClick={() => setVerClave(!verClave)}
        >
          <Icono nombre={verClave ? 'ojoTachado' : 'ojo'} />
        </button>
      </span>
    </label>
  )
}

export default CampoClave
