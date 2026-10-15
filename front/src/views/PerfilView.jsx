/*
  BORRAR ESTE COMENTARIO ANTES DE COMMITEAR (npm run lint marca error mientras esté)
  Para Fátima: Mi perfil
  - Imágenes: F07-perfil, F08-perfil-mail-repetido
  - GET /api/usuarios/me al montar (useEffect con [])
  - PUT /api/usuarios/me con { nombre, apellido, email }: devuelve token nuevo, llamar a onLogin(respuesta) (corrección del feedback)
  - Mostrar <Aviso tipo="exito" mensaje="Datos actualizados" /> o el error 409 si el mail es de otra cuenta
  - Componentes sugeridos en components/usuarios/: FormPerfil
*/
function PerfilView({ usuario, onLogin }) {
  return <h1 className="titulo-pagina">Mi perfil</h1>
}

export default PerfilView
