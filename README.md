# DynoMarket / Motorroll API

API REST del e-commerce de **bancos de potencia, dinamómetros y equipamiento de testeo vehicular**.

TPO de Aplicaciones Interactivas — UADE, 2° cuatrimestre 2026. Comisión 6132, miércoles 13:30 a 17:30.

> **Rama de trabajo:** `draft/entrega-1-backend`. Corresponde a la **primera entrega (9 de septiembre): back-end**.
> El front-end (React + Vite) va en la segunda entrega y Redux en la tercera.

---

## 1. Qué cubre esta entrega

Según el cronograma, la primera entrega es: *API REST con Spring Boot, persistencia con Hibernate y
autenticación con JWT. Endpoints de usuarios, productos, categorías y carrito.*

| Requisito del enunciado | Dónde está resuelto |
|---|---|
| Registro como comprador y vendedor | `POST /api/auth/registro` |
| Autenticación con usuario y contraseña | `POST /api/auth/login` → devuelve token JWT |
| Administración de cuentas y asignación de permisos | `/api/usuarios/**` (solo rol `ADMIN`) |
| Catálogo con foto y precio | `GET /api/productos` |
| Búsqueda y filtrado por categoría, precio, etc. | query params de `GET /api/productos` |
| Detalle del producto con imagen y descripción | `GET /api/productos/{id}` |
| Indicación de falta de stock | campos `stock` y `hayStock` en la respuesta |
| No se puede agregar al carrito sin stock | validado en `POST /api/carrito/items` |
| Carrito: agregar, eliminar, modificar | `/api/carrito/**` |
| Checkout con cálculo automático del total | `POST /api/carrito/checkout` |
| Validación y descuento de stock al confirmar | se revalida ítem por ítem antes de descontar |
| Alta de publicación con una o más fotos | `POST /api/productos` |
| Gestión de stock y baja de la publicación | `PATCH /api/productos/{id}/stock`, `DELETE /api/productos/{id}` |
| Gestión de descuentos por producto | `PATCH /api/productos/{id}/descuento` |

---

## 2. Stack

| Capa | Tecnología |
|---|---|
| Lenguaje | Java 17 |
| Framework | Spring Boot 4.1.1 (Spring MVC) |
| Persistencia | Spring Data JPA + Hibernate |
| Base de datos | H2 en archivo (`./data/motorroll`) |
| Seguridad | Spring Security + JWT (jjwt 0.12.6), contraseñas con BCrypt |
| Validación | Jakarta Bean Validation |
| Boilerplate | Lombok |

---

## 3. Cómo levantarlo

```bash
./mvnw spring-boot:run
```

En Windows (cmd/PowerShell): `mvnw.cmd spring-boot:run`

- API: `http://localhost:8080`
- Consola de H2: `http://localhost:8080/h2-console`
  (JDBC URL `jdbc:h2:file:./data/motorroll`, usuario `sa`, sin contraseña)

Para arrancar con la base vacía, borrar la carpeta `data/` y volver a levantar.

---

## 4. Usuarios de prueba

Se cargan solos la primera vez que arranca la aplicación (`DataLoader`).
Se desactiva con `motorroll.datos-iniciales=false`.

| Usuario | Contraseña | Rol |
|---|---|---|
| `admin` | `admin1234` | ADMIN |
| `motorroll` | `vendedor1234` | VENDEDOR |
| `dynotech` | `vendedor1234` | VENDEDOR |
| `taller.vtv` | `comprador1234` | COMPRADOR |
| `tuning.rp` | `comprador1234` | COMPRADOR |

Junto con los usuarios se cargan 10 categorías y 12 productos de ejemplo (bancos inerciales,
hidráulicos, mixtos, de motos, software, sensores, repuestos y servicios).

---

## 5. Autenticación

1. `POST /api/auth/login` con `{ "username": "...", "password": "..." }`
2. La respuesta trae el `token`.
3. En cada request protegido va el header:

```
Authorization: Bearer <token>
```

La API es *stateless*: no hay sesión de servidor, el token viaja en cada request y vence a las 24 hs.

---

## 6. Endpoints

### Auth — público

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/registro` | Registro como `COMPRADOR` o `VENDEDOR` |
| POST | `/api/auth/login` | Devuelve el token JWT |

### Productos

| Método | Ruta | Quién |
|---|---|---|
| GET | `/api/productos` | público |
| GET | `/api/productos/{id}` | público |
| GET | `/api/productos/marcas` | público |
| GET | `/api/productos/mis-publicaciones` | vendedor logueado |
| POST | `/api/productos` | vendedor |
| PUT | `/api/productos/{id}` | vendedor dueño |
| PATCH | `/api/productos/{id}/stock` | vendedor dueño |
| PATCH | `/api/productos/{id}/descuento` | vendedor dueño |
| DELETE | `/api/productos/{id}` | vendedor dueño (baja lógica) |

Filtros de `GET /api/productos` (todos opcionales y combinables):

```
?texto=inercial
&categoriaId=2
&marca=Motorroll
&precioMin=1000
&precioMax=90000
&soloConStock=true
&ordenarPor=precio_asc     // precio_asc | precio_desc | nombre | (default: más recientes)
```

Si `categoriaId` apunta a una categoría padre, también trae los productos de sus subcategorías.

### Categorías

| Método | Ruta | Quién |
|---|---|---|
| GET | `/api/categorias` | público |
| GET | `/api/categorias/{id}` | público |
| POST | `/api/categorias` | ADMIN |
| PUT | `/api/categorias/{id}` | ADMIN |
| DELETE | `/api/categorias/{id}` | ADMIN |

### Carrito

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/carrito` | Carrito abierto del usuario (lo crea si no existe) |
| POST | `/api/carrito/items` | Agregar producto `{ productoId, cantidad }` |
| PUT | `/api/carrito/items/{itemId}` | Modificar cantidad |
| DELETE | `/api/carrito/items/{itemId}` | Eliminar un ítem |
| DELETE | `/api/carrito` | Vaciar el carrito |
| POST | `/api/carrito/checkout` | Confirmar la compra → genera la orden |

### Órdenes

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/ordenes` | Historial de compras del usuario |
| GET | `/api/ordenes/{id}` | Detalle de una orden propia |

### Usuarios

| Método | Ruta | Quién |
|---|---|---|
| GET | `/api/usuarios/me` | usuario logueado |
| PUT | `/api/usuarios/me` | usuario logueado |
| GET | `/api/usuarios` | ADMIN |
| GET | `/api/usuarios/{id}` | ADMIN |
| PUT | `/api/usuarios/{id}/rol` | ADMIN (asignación de permisos) |
| PUT | `/api/usuarios/{id}/estado` | ADMIN (habilitar / deshabilitar cuenta) |
| DELETE | `/api/usuarios/{id}` | ADMIN |

---

## 7. Ejemplo de flujo completo

```bash
# 1) Login como comprador
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"taller.vtv","password":"comprador1234"}'

# 2) Ver el catálogo filtrando por precio
curl "http://localhost:8080/api/productos?precioMax=50000&ordenarPor=precio_asc"

# 3) Agregar un producto al carrito
curl -X POST http://localhost:8080/api/carrito/items \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"productoId":1,"cantidad":1}'

# 4) Checkout: calcula el total, valida y descuenta el stock
curl -X POST http://localhost:8080/api/carrito/checkout \
  -H "Authorization: Bearer $TOKEN"
```

En `postman/DynoMarket.postman_collection.json` está la colección completa para importar en Postman.
El login guarda el token en una variable de entorno, así el resto de los requests salen sin copiar nada a mano.

---

## 8. Estructura del proyecto

Arquitectura en tres capas, con interfaz + implementación en la capa de servicios:

```
com.motorroll.motorroll_api
├── controller/   → capa de presentación: recibe el request HTTP
├── service/      → lógica de negocio (interfaces)
│   └── impl/     → implementaciones (@Service)
├── repository/   → acceso a datos (JpaRepository)
├── model/        → entidades JPA
├── dto/          → objetos de entrada y salida de la API
├── mapper/       → traducción entidad ↔ DTO
├── exception/    → excepciones propias + manejador global
├── security/     → JwtService y filtro de autenticación
└── config/       → SecurityConfig y carga de datos de ejemplo
```

Los controllers nunca devuelven entidades: siempre DTOs. Así la API no expone la contraseña
ni arrastra las relaciones internas de Hibernate.

---

## 9. Modelo de datos

```
Usuario 1 ──── N Producto          (vendedor)
Usuario 1 ──── N Orden             (comprador)
Usuario 1 ──── N Carrito           (comprador, uno solo ABIERTO)

Categoria 1 ── N Producto
Categoria 1 ── N Categoria         (categoría padre / subcategorías)

Producto 1 ─── N ImagenProducto
Producto 1 ─── 1 FichaTecnica

Carrito 1 ──── N ItemCarrito ──── 1 Producto
Orden   1 ──── N ItemOrden   ──── 1 Producto
```

Decisiones de modelado:

- **Servicios como productos.** Calibración e instalación se publican como un producto más
  (`esServicio = true`), donde el stock representa los cupos disponibles. Reutilizan la misma
  lógica de publicación, carrito y checkout.
- **`ItemOrden` congela los datos.** Guarda nombre, precio unitario y descuento del momento de la
  compra, para que el historial no cambie si después el vendedor edita la publicación.
- **Baja lógica de productos.** `DELETE` pone `activo = false`: la publicación sale del catálogo
  pero las órdenes viejas la siguen referenciando.

---

## 10. Manejo de errores

Todos los errores devuelven el mismo formato:

```json
{
  "timestamp": "2026-09-02T14:35:12.123",
  "status": 400,
  "error": "Bad Request",
  "mensaje": "No hay stock suficiente de Banco mixto MR-MX3000. Disponible: 0, pediste: 1",
  "path": "/api/carrito/items"
}
```

Cuando falla la validación de un DTO se agrega el detalle campo por campo:

```json
{
  "status": 400,
  "mensaje": "Hay campos invalidos en la solicitud",
  "errores": { "precio": "El precio tiene que ser mayor a cero" }
}
```

| Código | Cuándo |
|---|---|
| 400 | Validación de campos o regla de negocio (sin stock, carrito vacío) |
| 401 | Falta el token, está vencido, o las credenciales son incorrectas |
| 403 | El rol no habilita la operación, o el producto no es del vendedor |
| 404 | El recurso no existe |
| 409 | Alta duplicada (username, mail o categoría que ya existe) |

---

## 11. Pendiente para las próximas entregas

- **2ª entrega (21/10):** front-end con React + Vite, ruteo y consumo de la API.
- **3ª entrega (25/11):** estado global con Redux, ajustes de UX/UI y presentación final.
- Subida real de imágenes (hoy la publicación guarda las URLs de las fotos).
