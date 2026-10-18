function SubirFoto({ onSubir }) {
  function elegir(e) {
    const foto = e.target.files[0]
    if (foto) onSubir(foto)
  }

  return (
    <label className="boton boton-secundario">
      Agregar foto
      <input type="file" accept="image/*" hidden onChange={elegir} />
    </label>
  )
}

export default SubirFoto
