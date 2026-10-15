function SoloRol({ usuario, roles, children }) {
  if (!usuario || !roles.includes(usuario.rol)) return null
  return children
}

export default SoloRol
