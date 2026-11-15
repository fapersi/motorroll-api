# Motorroll – Front

Front de Motorroll (TPO Aplicaciones Interactivas, UADE, 2.º cuatrimestre 2026). React 19 + Vite + Redux Toolkit + axios, en JavaScript.

## Cómo levantarlo

1. Levantar el back desde la carpeta raíz del repo: `./mvnw spring-boot:run` (en Windows: `mvnw.cmd spring-boot:run`). Queda en `http://localhost:8080`.
2. En esta carpeta: `npm install` (solo la primera vez) y después `npm run dev`. Queda en `http://localhost:5173`.

Usuarios de prueba: `taller.vtv` / `comprador1234`, `motorroll` / `vendedor1234`, `admin` / `admin1234`.

## Estructura

| Carpeta | Qué hay |
| --- | --- |
| `src/redux/` | `store.js` y un slice por servicio del back |
| `src/views/` | Una vista por URL |
| `src/components/` | Componentes comunes (`Aviso`, `Modal`, `Cargando`, `SoloRol`, `Campo`, `Icono`) y una subcarpeta por tema |
| `src/routes/` | `Rutas` (todas las rutas) y `RutaPrivada` |
| `src/hooks/` | `useLimpiarAlSalir` (borra el error de un slice al salir de la pantalla) |
| `src/utils/` | `api.js` (axios con el token y los errores), `sesion.js` (token en localStorage), `formato.js`, `fechas.js`, `numeros.js`, `puntos.js` y otros cálculos |
| `src/assets/` | Logo, banner y fotos fijas |

## Redux: los slices y quién explica cada uno

| Slice | Estado global | Acciones principales | Lo explica |
| --- | --- | --- | --- |
| `usuarioSlice` | `usuario` | `login`, `registrar`, `fetchPerfil`, `updatePerfil`, `fetchUsuarios`, `updateRol`, `updateEstado`, `deleteUsuario` | Fátima |
| `categoriaSlice` | `categorias` | `fetchCategorias`, `createCategoria`, `updateCategoria`, `deleteCategoria` | Fátima |
| `productoSlice` | `productos` | `fetchProductos`, `fetchProductoPorId`, `fetchMisProductos`, `createProducto`, `updateProducto`, `updateStock`, `updateDescuento`, `addFoto`, `deleteProducto` | Thiago |
| `resenaSlice` | `resenas` | `fetchResenas`, `createResena` | Thiago |
| `ordenSlice` | `ordenes` | `fetchOrdenes` | Thiago |
| `tiendaSlice` | `tiendas` | `fetchTiendas`, `fetchTienda`, `fetchMiTienda`, `updateMiTienda`, `updateLogo` | Thiago |
| `carritoSlice` | `carrito` | `fetchCarrito`, `addItem`, `updateCantidad`, `removeItem`, `clearCarrito`, `checkout` | Meli |
| `turnoSlice` | `turnos` | `fetchBancos`, `fetchAgenda`, `fetchMisTurnos`, `createTurno`, `cancelTurno` | Meli |
| `notificacionSlice` | `notificaciones` | `fetchNotificaciones`, `marcarLeida`, `marcarTodasLeidas` | Meli |
| `temaSlice` | `tema` | `cambiarTema` (síncrona) | Meli |

Todos saben todos: la columna dice quién lo explica si la profe pregunta "¿qué hiciste vos en los slices?".

## Cómo está armado Redux

- **Acciones asincrónicas:** `createAsyncThunk` con axios, siempre con la misma forma: `const { data } = await api.get(...)` y `return data`.
- **Tres estados:** cada acción tiene su `pending`, `fulfilled` y `rejected` en `extraReducers`. El error se toma de `action.error.message`; el interceptor de `api.js` ya le puso el mensaje del back.
- **Sin GET después de cambiar algo:** después de un POST, PUT, PATCH o DELETE, el reducer actualiza el estado con la respuesta (spread para agregar, `findIndex` para editar, `filter` para borrar). Cuando el back crea un aviso, lo devuelve dentro de la misma respuesta (la orden o el turno) y `notificacionSlice` lo suma a la lista.
- **Cada dato se pide una vez:** las listas arrancan en `null` ("todavía no hay valor") o con `cargado: false`, y el componente pide solo si todavía no están.
- **Una acción, varios slices:** `checkout.fulfilled` vacía el carrito, suma la orden, descuenta el stock, agrega el aviso y actualiza los puntos, sin pedir nada.
- **Los componentes solo despachan:** ninguno llama al back. Leen con `useSelector` y despachan con `useDispatch`.

## Cómo se usa lo común

- **Mostrar errores:** `<Aviso mensaje={error} onCerrar={() => dispatch(limpiarError())} />`. Con `accion={{ texto, onClick }}` suma un botón, por ejemplo "Reintentar".
- **Limpiar al salir:** `useLimpiarAlSalir(limpiarError)` borra el error del slice cuando la pantalla se desmonta, así no aparece en otra.
- **Campos:** `<Campo etiqueta name value onChange error ayuda />`. Para precios, `inputMode="decimal"` y `normalizarDecimal` de `utils/numeros.js`, que acepta "48.500" y "1850,50".
- **Confirmaciones:** `<Modal titulo texto textoConfirmar onConfirmar onCancelar />`. Se cierra con Escape o tocando afuera.
- **Botones según el rol:** `<SoloRol usuario={usuario} roles={['COMPRADOR']}>...</SoloRol>`.
- **Rutas protegidas:** `RutaPrivada` manda al login guardando `desde` y un aviso; después del login o del registro se vuelve ahí.

## Reglas del grupo

- Nada de `document.`, `window.`, `alert` ni `confirm`.
- Siempre `===` y `!==`.
- Keys estables (el id), nunca el índice.
- `null` para "todavía no hay valor".
- Ningún componente con más de 70 líneas. Los slices pueden ser más largos: todas las acciones de un estado global van juntas.
- Sin comentarios en el código.
- Antes de subir: `npm run lint` sin errores y `npm run build`.
