/*
  BORRAR ESTE COMENTARIO ANTES DE COMMITEAR (npm run lint marca error mientras esté)
  Para Fátima: Crear cuenta
  - Imágenes: F04-registro, F05-registro-validaciones, F06-registro-duplicado
  - Campos: nombre, apellido, email, username, password, rol (COMPRADOR o VENDEDOR)
  - POST /api/auth/registro. Si sale bien: onLogin(respuesta) y navigate("/")
  - Errores 400: error.errores trae un mensaje por campo, mostrarlo debajo de cada input. 409: usuario o mail repetido en <Aviso>
  - Componentes sugeridos en components/usuarios/: FormRegistro, Campo
*/
function RegistroView({ onLogin }) {
  return <h1 className="titulo-pagina">Crear cuenta</h1>
}

export default RegistroView
