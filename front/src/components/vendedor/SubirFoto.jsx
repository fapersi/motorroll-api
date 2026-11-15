import { TIPOS_DE_FOTO } from './datosProducto'

function SubirFoto({ onSubir }) {
  function elegir(e) {
    const foto = e.target.files[0]
    if (foto) onSubir(foto)
  }

  return (
    <label className="boton-accion subir-archivo">
      Agregar foto
      <input
        type="file"
        className="visualmente-oculto"
        accept={TIPOS_DE_FOTO.join(',')}
        onChange={elegir}
      />
    </label>
  )
}

export default SubirFoto
