# Motorroll – Front

Front de Motorroll (TPO Aplicaciones Interactivas, UADE, 2° cuatrimestre 2026). React + Vite, en JavaScript.

## Cómo levantarlo

1. Levantar el back desde la carpeta raíz del repo: `./mvnw spring-boot:run` (en Windows: `mvnw.cmd spring-boot:run`). Queda en `http://localhost:8080`.
2. En esta carpeta: `npm install` (solo la primera vez) y después `npm run dev`. Queda en `http://localhost:5173`.

Usuarios de prueba: `taller.vtv` / `comprador1234`, `motorroll` / `vendedor1234`, `admin` / `admin1234`.

## Estructura

| Carpeta | Qué hay |
| --- | --- |
| `src/views/` | Una vista por URL |
| `src/components/` | Componentes comunes (`Aviso`, `Modal`, `Cargando`, `SoloRol`); en `layout/` la navbar, el footer y la portada; y una subcarpeta por parte: `usuarios/` y `admin/` (Fátima), `catalogo/` y `vendedor/` (Thiago), `carrito/` y `ordenes/` (Tomás) |
| `src/routes/` | `Rutas` (todas las rutas) y `RutaPrivada` |
| `src/services/` | Las llamadas al back de cada parte (`usuariosService`, `catalogoService`, `carritoService`) |
| `src/utils/` | `api.js` (`pedir`, `URL_BASE`) y `sesion.js` (token y usuario en localStorage) |
| `src/assets/` | Logo, banner y fotos fijas |

## Quién hace cada vista

| Vista | Ruta | Dueño |
| --- | --- | --- |
| `CatalogoView`, `DetalleView`, `PanelVendedorView` | `/`, `/producto/:id`, `/vendedor` | Thiago |
| `LoginView`, `RegistroView`, `PerfilView`, `AdminView` | `/login`, `/registro`, `/perfil`, `/admin` | Fátima |
| `CarritoView`, `CheckoutView`, `OrdenesView` | `/carrito`, `/checkout`, `/ordenes` | Tomás |
| `NosotrosView`, `SinPermisoView`, `NoEncontradoView`, navbar, menú para celular, rutas, sesión | `/nosotros`, `/sin-permiso`, `*` | Melinda |

## Cómo se usa lo común

- **Llamar al back:** `pedir(ruta, { method, body })` devuelve una promesa con los datos y agrega el token solo. `body` puede ser un objeto (viaja como JSON) o un `FormData` (fotos).
  ```js
  pedir('/api/carrito/items', { method: 'POST', body: { productoId: 1, cantidad: 1 } })
    .then((carrito) => setCarrito(carrito))
    .catch((error) => setError(error.message))
  ```
- **Mostrar errores:** un estado `const [error, setError] = useState(null)` y en el JSX `<Aviso mensaje={error} onCerrar={() => setError(null)} />`. Si el back respondió un error, `error.message` trae su mensaje. Para un mensaje de éxito: `<Aviso mensaje="Listo" tipo="exito" />`.
- **La sesión vive en `App`:** el estado `usuario` está en `App` y baja por props.
  - `LoginView`, `RegistroView` y `PerfilView` reciben `onLogin`. Después del login, del registro o de editar el perfil se llama a `onLogin(respuesta)`: las tres respuestas traen `token` + `usuario`, así que se guarda el token nuevo y la navbar se actualiza sola.
  - `CatalogoView`, `DetalleView`, `PerfilView`, `PanelVendedorView` y `AdminView` reciben `usuario` (es `null` si no hay sesión).
- **Botones según el rol:** `<SoloRol usuario={usuario} roles={['COMPRADOR']}>...</SoloRol>` muestra lo de adentro solo a esos roles. Por ejemplo, el botón "Agregar al carrito" va adentro de un `SoloRol` de COMPRADOR, así el vendedor y el admin no lo ven.
- **Sesión que vence:** cuando pasan las 24 horas del token, `App` cierra la sesión y manda al login con `state.aviso`. El login lo muestra con `<Aviso mensaje={location.state?.aviso} tipo="info" />`.
- **Volver a donde estaba:** `RutaPrivada` manda al login guardando la ruta en `state.desde`. Después del login: `navigate(location.state?.desde || '/')`.
- **Confirmaciones:** `<Modal titulo onConfirmar onCancelar />`. Mientras carga: `<Cargando />`.
- **Clases CSS comunes** (en `index.css`): `boton`, `boton-secundario`, `grilla`, `tarjeta`, `precio`, `precio-anterior`, `sin-stock`, `formulario`, `campo`, `campo-error`, `tabla`, `titulo-pagina`.

## Cómo arrancar tu parte

Cada vista y cada service tuyo tiene arriba un comentario que empieza con **BORRAR ESTE COMENTARIO ANTES DE COMMITEAR**. Ahí está qué imagen de referencia mirar, qué endpoints llamar y qué componentes conviene crear. Mientras ese comentario exista, `npm run lint` marca error: es a propósito, para que nadie lo suba.

## Reglas del grupo

- Nada de `document.`, `window.`, `alert` ni `confirm`.
- Sin comentarios en el código.
- Ningún componente con más de 70 líneas de JavaScript.
- Un solo GET por pantalla al montar (`useEffect` con `[]`); después de un POST, PUT, PATCH o DELETE se actualiza el estado con la respuesta, sin otro GET.
- Antes de subir: `npm run lint` sin errores (además de los comentarios a borrar, marca `==`, `var`, `alert`, `confirm` y `window`) y `npm run build`.
