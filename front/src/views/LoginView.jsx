/*
  BORRAR ESTE COMENTARIO ANTES DE COMMITEAR (npm run lint marca error mientras esté)
  Para Fátima: Ingresar
  - Imágenes de referencia: Imagenes de Fatima/F01-login, F02-login-error, F03-login-sesion-vencida
  - Formulario controlado con un estado-objeto { username, password } (name igual al DTO)
  - onSubmit: e.preventDefault(), validar vacíos con trim(), pedir("/api/auth/login", { method: "POST", body: datos })
  - Si sale bien: onLogin(respuesta) y navigate(location.state?.desde || "/")
  - Si falla: mostrar error.message en <Aviso> (401 = usuario o contraseña incorrectos)
  - Si location.state?.aviso existe (sesión vencida), mostrarlo con <Aviso tipo="info">
  - Componentes sugeridos en components/usuarios/: FormLogin
*/
function LoginView({ onLogin }) {
  return <h1 className="titulo-pagina">Ingresar</h1>
}

export default LoginView
