import { useState } from 'react'
import LogoTienda from './LogoTienda'

const CINCO_MB = 5 * 1024 * 1024

function SubirLogo({ tienda, enviando, onElegir }) {
  const [problema, setProblema] = useState(null)

  function elegir(e) {
    const archivo = e.target.files[0]
    if (!archivo) return
    if (!archivo.type.startsWith('image/')) return setProblema('El logo tiene que ser una imagen')
    if (archivo.size > CINCO_MB) return setProblema('El logo no puede pesar más de 5 MB')
    setProblema(null)
    onElegir(archivo)
  }

  return (
    <div className="campo">
      Logo
      <div className="subir-logo">
        <LogoTienda tienda={tienda} tamanio="grande" />
        <div>
          <label className="boton boton-secundario subir-archivo">
            {tienda.logo ? 'Cambiar logo' : 'Subir logo'}
            <input
              type="file"
              className="visualmente-oculto"
              accept="image/png,image/jpeg,image/webp,image/gif"
              disabled={enviando}
              onChange={elegir}
            />
          </label>
          <p className="ayuda">PNG, JPG, WEBP o GIF de hasta 5 MB. Se ve mejor cuadrado.</p>
        </div>
      </div>
      {problema && <p className="campo-error">{problema}</p>}
    </div>
  )
}

export default SubirLogo
