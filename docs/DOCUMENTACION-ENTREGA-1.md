# Documentación — Primera entrega (back-end)

**TPO Aplicaciones Interactivas — UADE, 2° cuatrimestre 2026**
Comisión 6132 · Miércoles 13:30 a 17:30 · Docente: Cuello, Gisele Gabriela

Proyecto: **DynoMarket / Motorroll API** — e-commerce de bancos de potencia, dinamómetros y
equipamiento de testeo vehicular.

Rama: `draft/entrega-1-backend` · Commit: `e57020c`

---

## 1. Alcance de esta entrega

Según el cronograma, la primera entrega (9 de septiembre) es:

> *Back-end: API REST con Spring Boot, persistencia con Hibernate y autenticación con JWT.
> Endpoints de usuarios, productos, categorías y carrito.*

Eso es exactamente lo que está implementado. **No se desarrolló nada de front-end**, que corresponde
a la segunda entrega (21/10), ni Redux, que va en la tercera (25/11).

### Qué se entrega

| | |
|---|---|
| Clases Java de producción | 76 |
| Clases de test | 2 (6 tests) |
| Líneas de código de producción | ~3.500 |
| Endpoints REST | 27 |
| Entidades persistidas | 9 (+ 3 enums) |
| Documentación | README + esta doc + colección de Postman |

---

## 2. Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Lenguaje | Java | 17 |
| Framework | Spring Boot (Spring MVC) | 4.1.1 |
| Persistencia | Spring Data JPA + Hibernate | — |
| Base de datos | H2 en archivo (`./data/motorroll`) | — |
| Seguridad | Spring Security + JWT (jjwt) | 0.12.6 |
| Hash de contraseñas | BCrypt | — |
| Validación | Jakarta Bean Validation | — |
| Boilerplate | Lombok | — |
| Build | Maven (wrapper incluido) | 3.9.16 |

### Dependencias que hubo que agregar al proyecto base

El proyecto que veníamos arrastrando (generado con Spring Initializr) traía JPA, validación, webmvc,
H2 y Lombok. Sobre eso se agregó:

- `spring-boot-starter-security` — autenticación y autorización.
- `jjwt-api` / `jjwt-impl` / `jjwt-jackson` — generación y validación de los tokens.
- `spring-boot-starter-jackson` — **importante**: Spring Boot 4 movió Jackson a su propio starter y
  cambió al paquete `tools.jackson`. Sin este starter la API no puede serializar JSON.
- `spring-boot-devtools` — recarga en caliente mientras se desarrolla (es la dependencia que se usó
  en clase para no tener que reiniciar a mano).

---

## 3. Arquitectura

Arquitectura en **tres capas**, tal como se vio en clase, con interfaz + implementación en la capa
de servicios para que las capas no dependan de la implementación concreta:

```
Cliente HTTP (Postman / front)
        │  JSON
        ▼
┌───────────────────┐
│   @RestController │  controller/    → recibe el request, valida el DTO, delega
└─────────┬─────────┘
          ▼
┌───────────────────┐
│     @Service      │  service/ + impl/  → lógica de negocio, @Transactional
└─────────┬─────────┘
          ▼
┌───────────────────┐
│    @Repository    │  repository/   → JpaRepository
└─────────┬─────────┘
          ▼
     Hibernate → H2
```

### Estructura de paquetes

```
com.motorroll.motorroll_api
├── controller/   (6)   capa de presentación
├── service/      (6)   interfaces de negocio
│   └── impl/     (6)   implementaciones con @Service
├── repository/   (5)   acceso a datos
├── model/        (12)  entidades JPA + enums
├── dto/          (25)  objetos de entrada y salida
├── mapper/       (5)   traducción entidad ↔ DTO
├── exception/    (6)   excepciones propias + manejador global
├── security/     (2)   JwtService y filtro de autenticación
└── config/       (2)   SecurityConfig y carga de datos de ejemplo
```

### Por qué DTOs y no entidades

Los controllers **nunca** devuelven entidades. Siempre DTOs. Tres motivos concretos:

1. La entidad `Usuario` tiene el campo `password`. Si devolviéramos la entidad, la API estaría
   exponiendo el hash de la contraseña.
2. Las entidades tienen relaciones bidireccionales (`Usuario` → `Orden` → `Usuario`). Serializarlas
   directamente entra en recursión infinita.
3. Lo que el usuario manda al crear algo no es lo mismo que lo que la base guarda. Cuando se crea una
   categoría, el usuario manda solo el nombre y la descripción: el `id` lo genera la base.

---

## 4. Modelo de datos

```
Usuario 1 ──── N Producto          (vendedor)
Usuario 1 ──── N Orden             (comprador)
Usuario 1 ──── N Carrito           (comprador; uno solo en estado ABIERTO)

Categoria 1 ── N Producto
Categoria 1 ── N Categoria         (categoría padre / subcategorías)

Producto 1 ─── N ImagenProducto
Producto 1 ─── 1 FichaTecnica

Carrito 1 ──── N ItemCarrito ──── 1 Producto
Orden   1 ──── N ItemOrden   ──── 1 Producto
```

### Entidades

| Entidad | Atributos principales |
|---|---|
| `Usuario` | id, username, email, password (BCrypt), nombre, apellido, rol, fechaAlta, activo |
| `Categoria` | id, nombre, descripcion, categoriaPadre, subcategorias |
| `Producto` | id, nombre, descripcion, precio, stock, marca, descuento, activo, esServicio, fechaAlta, categoria, vendedor |
| `ImagenProducto` | id, url, orden, producto |
| `FichaTecnica` | id, potenciaMaximaHp, velocidadMaximaKmh, tipoTraccion, diametroRodilloMm, pesoKg, requerimientosSala |
| `Carrito` | id, comprador, estado (ABIERTO/CONFIRMADO), fechaCreacion, items |
| `ItemCarrito` | id, carrito, producto, cantidad, precioUnitario |
| `Orden` | id, comprador, fecha, total, estado, items |
| `ItemOrden` | id, orden, producto, nombreProducto, cantidad, precioUnitario, descuentoAplicado, subtotal |

Enums: `Rol` (COMPRADOR / VENDEDOR / ADMIN), `EstadoCarrito`, `EstadoOrden`.

### Cómo se mapearon las relaciones

Siguiendo lo que se explicó en la Clase 3:

```java
// Lado "uno": la lista, mapeada por el atributo del otro lado
@OneToMany(mappedBy = "vendedor")
private List<Producto> productos;

// Lado "muchos": la foreign key real en la tabla
@ManyToOne(fetch = FetchType.LAZY, optional = false)
@JoinColumn(name = "vendedor_id", nullable = false)
private Usuario vendedor;
```

El nombre que va en `mappedBy` tiene que ser **exactamente igual** al del atributo del otro lado, si no
Hibernate no puede mapear nada. Y `nullable = false` en el `@JoinColumn` obliga a que la relación exista:
no se puede guardar un producto sin saber qué vendedor lo publicó.

Todas las entidades tienen **constructor vacío** (`@NoArgsConstructor`). Hibernate lo necesita sí o sí
para construir los objetos que vienen de la base; sin él la aplicación rompe al hacer el primer `GET`.

### Decisiones de modelado

**Los servicios son un producto más.** Calibración e instalación se publican con `esServicio = true`,
donde el `stock` representa los cupos disponibles del mes. Así reutilizan exactamente la misma lógica
de publicación, carrito y checkout que el resto del catálogo, sin agregar complejidad al modelo.

**`ItemOrden` congela los datos de la compra.** Guarda el nombre, el precio unitario y el descuento del
momento en que se compró. Si mañana el vendedor cambia el precio o edita la publicación, el historial de
compras no cambia. Sin esto, una orden de septiembre mostraría los precios de noviembre.

**Baja lógica de productos.** El `DELETE` no borra la fila: pone `activo = false`. La publicación
desaparece del catálogo público, pero las órdenes viejas la siguen referenciando. Un borrado físico
rompería el historial de compras de otros usuarios.

**Categorías con jerarquía.** `Categoria` tiene una relación consigo misma, lo que permite armar
"Bancos de potencia → Inercial / Hidráulico / Mixto / Motos". El filtro del catálogo aprovecha esto:
filtrar por la categoría padre trae también los productos de las subcategorías.

---

## 5. Seguridad

### Cómo funciona

La API es **stateless**: no hay sesión de servidor. En cada request el cliente manda el token.

```
1. POST /api/auth/login  { username, password }
2. AuthService verifica la contraseña contra el hash BCrypt
3. JwtService genera un token firmado (HS512) con subject=username, claims id y rol
4. El cliente manda en cada request:  Authorization: Bearer <token>
5. JwtAuthenticationFilter valida la firma, busca el usuario, verifica que esté activo
   y deja la autenticación en el SecurityContext
6. Spring Security decide si el rol alcanza para esa ruta
```

El token vence a las 24 horas. La clave de firma sale de `application.properties` y se puede
sobreescribir con la variable de entorno `MOTORROLL_JWT_SECRET`.

### Contraseñas

Nunca se guardan en texto plano. Se hashean con **BCrypt** al registrarse y en el login se compara
con `passwordEncoder.matches()`. El hash nunca sale en ninguna respuesta de la API porque los
controllers devuelven `UsuarioResponse`, que no tiene el campo.

### Matriz de permisos

| Ruta | Público | COMPRADOR | VENDEDOR | ADMIN |
|---|:---:|:---:|:---:|:---:|
| `POST /api/auth/**` | ✅ | ✅ | ✅ | ✅ |
| `GET /api/productos`, `/api/productos/{id}`, `/marcas` | ✅ | ✅ | ✅ | ✅ |
| `GET /api/categorias`, `/api/categorias/{id}` | ✅ | ✅ | ✅ | ✅ |
| `GET/PUT /api/usuarios/me` | ❌ | ✅ | ✅ | ✅ |
| `/api/carrito/**`, `/api/ordenes/**` | ❌ | ✅ | ✅ | ✅ |
| `POST/PUT/PATCH/DELETE /api/productos/**` | ❌ | ❌ | ✅ (solo los propios) | ✅ |
| `POST/PUT/DELETE /api/categorias/**` | ❌ | ❌ | ❌ | ✅ |
| `/api/usuarios` (administración de cuentas) | ❌ | ❌ | ❌ | ✅ |

La restricción "solo los propios" no la puede resolver Spring Security por rol: se valida en el
servicio comparando el id del vendedor del producto contra el id del usuario logueado.

---

## 6. Endpoints

27 endpoints en total.

### Auth (2) — público

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/registro` | Registro como COMPRADOR o VENDEDOR |
| POST | `/api/auth/login` | Devuelve el token JWT |

### Productos (9)

| Método | Ruta | Quién |
|---|---|---|
| GET | `/api/productos` | público |
| GET | `/api/productos/{id}` | público |
| GET | `/api/productos/marcas` | público |
| GET | `/api/productos/mis-publicaciones` | vendedor |
| POST | `/api/productos` | vendedor |
| PUT | `/api/productos/{id}` | vendedor dueño |
| PATCH | `/api/productos/{id}/stock` | vendedor dueño |
| PATCH | `/api/productos/{id}/descuento` | vendedor dueño |
| DELETE | `/api/productos/{id}` | vendedor dueño |

Filtros de `GET /api/productos`, todos opcionales y combinables:

```
?texto=inercial          busca en nombre y descripción
&categoriaId=1           incluye las subcategorías de esa categoría
&marca=Motorroll
&precioMin=1000
&precioMax=90000
&soloConStock=true
&ordenarPor=precio_asc   precio_asc | precio_desc | nombre | (default: más recientes)
```

### Categorías (5)

| Método | Ruta | Quién |
|---|---|---|
| GET | `/api/categorias` | público |
| GET | `/api/categorias/{id}` | público |
| POST | `/api/categorias` | ADMIN |
| PUT | `/api/categorias/{id}` | ADMIN |
| DELETE | `/api/categorias/{id}` | ADMIN |

### Carrito (6)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/carrito` | Carrito abierto (lo crea si no existe) |
| POST | `/api/carrito/items` | Agregar producto |
| PUT | `/api/carrito/items/{itemId}` | Modificar cantidad |
| DELETE | `/api/carrito/items/{itemId}` | Eliminar un ítem |
| DELETE | `/api/carrito` | Vaciar |
| POST | `/api/carrito/checkout` | Confirmar la compra |

### Órdenes (2) y Usuarios (7)

| Método | Ruta | Quién |
|---|---|---|
| GET | `/api/ordenes` | usuario logueado |
| GET | `/api/ordenes/{id}` | usuario logueado |
| GET | `/api/usuarios/me` | usuario logueado |
| PUT | `/api/usuarios/me` | usuario logueado |
| GET | `/api/usuarios` | ADMIN |
| GET | `/api/usuarios/{id}` | ADMIN |
| PUT | `/api/usuarios/{id}/rol` | ADMIN |
| PUT | `/api/usuarios/{id}/estado` | ADMIN |
| DELETE | `/api/usuarios/{id}` | ADMIN |

---

## 7. El checkout, paso a paso

Es la parte más delicada del negocio, así que va detallada.

```
POST /api/carrito/checkout
        │
        ├─ 1. Busca el carrito ABIERTO del usuario
        ├─ 2. Si está vacío → 400 "El carrito esta vacio"
        │
        ├─ 3. Por cada ítem:
        │      ├─ ¿la publicación sigue activa?  → si no, 400
        │      ├─ ¿hay stock suficiente AHORA?   → si no, 400 con el detalle
        │      ├─ precio unitario = precio × (100 − descuento) / 100
        │      ├─ subtotal = precio unitario × cantidad
        │      └─ acumula el total
        │
        ├─ 4. Crea la Orden con sus ItemOrden (datos congelados)
        ├─ 5. Descuenta el stock de cada producto
        ├─ 6. Marca el carrito como CONFIRMADO
        └─ 7. Devuelve 201 con la orden
```

Dos detalles que importan:

**El stock se revalida recién al confirmar, no al agregar al carrito.** Entre que alguien agrega un
banco al carrito y confirma pueden pasar horas, y otro comprador se pudo haber llevado la última
unidad. Como el rubro es de stock bajo (los equipos se fabrican a pedido), este caso es real, no teórico.

**Todo el método es `@Transactional`.** Si falla la validación del tercer ítem, el descuento de stock
de los dos primeros se revierte. No queda una compra a medias. Esto está verificado: en la prueba, el
checkout que falló no dejó el stock tocado.

**No hay procesamiento de pago**, tal como indica el enunciado. El flujo termina en la orden confirmada
con el stock descontado.

---

## 8. Manejo de errores

Todas las excepciones propias están anotadas con su `@ResponseStatus` y además hay un
`@RestControllerAdvice` que centraliza el formato de respuesta. Así el usuario nunca ve un stacktrace
y siempre recibe el mismo JSON:

```json
{
  "timestamp": "2026-09-02T14:35:12.123",
  "status": 400,
  "error": "Bad Request",
  "mensaje": "No hay stock suficiente de Banco mixto MR-MX3000. Disponible: 0, pediste: 1",
  "path": "/api/carrito/items"
}
```

Cuando lo que falla es la validación de un DTO, se agrega el detalle campo por campo:

```json
{
  "status": 400,
  "mensaje": "Hay campos invalidos en la solicitud",
  "errores": {
    "precio": "El precio tiene que ser mayor a cero",
    "nombre": "El nombre del producto es obligatorio"
  }
}
```

| Excepción | Código | Cuándo |
|---|---|---|
| `ReglaDeNegocioException` | 400 | Sin stock, carrito vacío, categoría con productos |
| `MethodArgumentNotValidException` | 400 | Falla una anotación de validación del DTO |
| `CredencialesInvalidasException` | 401 | Usuario o contraseña mal, o cuenta deshabilitada |
| `OperacionNoPermitidaException` | 403 | El rol no habilita, o el producto no es del vendedor |
| `RecursoNoEncontradoException` | 404 | El id no existe |
| `RecursoDuplicadoException` | 409 | Username, mail o categoría repetidos |

Los 401 y 403 que dispara Spring Security antes de llegar al controller (falta el token, está vencido)
devuelven el mismo formato, resuelto en el `SecurityConfig`.

---

## 9. Datos de ejemplo

La clase `DataLoader` carga un catálogo de demostración la primera vez que arranca la aplicación.
Se desactiva con `motorroll.datos-iniciales=false`.

**5 usuarios:**

| Usuario | Contraseña | Rol |
|---|---|---|
| `admin` | `admin1234` | ADMIN |
| `motorroll` | `vendedor1234` | VENDEDOR |
| `dynotech` | `vendedor1234` | VENDEDOR |
| `taller.vtv` | `comprador1234` | COMPRADOR |
| `tuning.rp` | `comprador1234` | COMPRADOR |

**10 categorías** con jerarquía: Bancos de potencia (padre) → Inercial, Hidráulico, Mixto, Bancos de
motos; más Software y electrónica, Sensores, Equipamiento de sala, Repuestos y Servicios.

**12 productos** del rubro real: bancos inerciales, hidráulico de motor, mixto de línea de producción,
banco de motos, software de ensayo, sonda Lambda, estación atmosférica, ventilador de sala, kit de
repuestos, y los dos servicios (calibración con trazabilidad INTI e instalación).

Los datos están armados a propósito para poder demostrar los casos de borde:

- El **banco mixto MR-MX3000 tiene stock 0** → sirve para mostrar "sin stock, no se puede agregar".
- El **DT-800 tiene 10% de descuento** y la **sonda Lambda 5%** → sirve para mostrar el cálculo del total.
- El **hidráulico MR-H2500 tiene stock 1** → sirve para mostrar la validación del checkout.

---

## 10. Pruebas realizadas

### Tests automatizados

`./mvnw test` → **6 tests, todos en verde**.

- `MotorrollApiApplicationTests` — verifica que el contexto de Spring levanta con todos los beans
  conectados (o sea: que la inyección de dependencias está bien armada en las tres capas).
- `CalculoDePreciosTest` — 5 tests sobre la lógica de precios y stock: precio final sin descuento,
  con descuento, `hayStockPara()` en los bordes, producto sin stock, y el total del carrito.

Los tests corren contra una base H2 **en memoria** (`application-test.properties`), así no ensucian
la base de desarrollo.

### Pruebas manuales sobre la API corriendo

Se levantó la aplicación y se probaron 36 casos con `curl`. Los principales:

| # | Caso | Esperado | Resultado |
|---|---|---|---|
| 1 | Catálogo público sin token | 200, 12 productos | ✅ |
| 2 | Filtrar por categoría padre (id=1) | trae las 4 subcategorías, 5 bancos | ✅ |
| 3 | Filtro combinado texto + precio + stock | 3 resultados | ✅ |
| 4 | Detalle con imágenes y ficha técnica | 200 con galería y ficha | ✅ |
| 5 | Producto con 10% de descuento | 32900 → precioFinal 29610 | ✅ |
| 6 | Acceder al carrito sin token | 401 con JSON | ✅ |
| 7 | Login comprador | 200 con token | ✅ |
| 8 | Agregar al carrito un producto sin stock | 400 con mensaje claro | ✅ |
| 9 | Pedir más unidades de las disponibles | 400 "Disponible: 3, pediste: 10" | ✅ |
| 10 | Total del carrito con descuentos | 48500 + 1966,50 = 50466,50 | ✅ |
| 11 | Checkout | 201 con la orden | ✅ |
| 12 | Stock descontado después del checkout | 3→2 y 18→15 | ✅ |
| 13 | Carrito después del checkout | nuevo carrito vacío | ✅ |
| 14 | Historial de órdenes | 200 con la orden | ✅ |
| 15 | Alta de publicación con 2 fotos + ficha | 201 | ✅ |
| 16 | Aplicar 20% de descuento | 72900 → 58320 | ✅ |
| 17 | Vendedor toca producto de otro vendedor | 403 | ✅ |
| 18 | Comprador intenta publicar | 403 | ✅ |
| 19 | DTO con campos inválidos | 400 con detalle por campo | ✅ |
| 20 | Registro con username repetido | 409 | ✅ |
| 21 | Login con contraseña incorrecta | 401 | ✅ |
| 22 | ADMIN cambia el rol de una cuenta | 200, rol actualizado | ✅ |
| 23 | Cuenta deshabilitada intenta loguear | 401 | ✅ |
| 24 | VENDEDOR intenta listar usuarios | 403 | ✅ |
| 25 | Crear categoría duplicada | 409 | ✅ |
| 26 | Borrar categoría con productos | 400 | ✅ |
| 27 | Baja lógica: sale del catálogo | 404 en detalle, 0 en búsqueda | ✅ |
| 28 | Baja lógica: sigue en mis-publicaciones | activo=false | ✅ |
| 29 | **Otro comprador se adelantó** → checkout | 400 y **no** descuenta stock | ✅ |
| 30 | Ajustar cantidad y reintentar | 201, orden generada | ✅ |

En `postman/DynoMarket.postman_collection.json` está la colección para reproducir todo esto desde
Postman. Los requests de login guardan el token en variables de la colección, así el resto sale solo.

---

## 11. Problemas encontrados y cómo se resolvieron

**Spring Boot 4 cambió Jackson de paquete.** El proyecto base no compilaba al usar `ObjectMapper`:
Boot 4 usa Jackson 3 (`tools.jackson`) en lugar de `com.fasterxml`, y lo movió a un starter aparte.
Sin `spring-boot-starter-jackson` la API directamente no puede devolver JSON. Se agregó la dependencia
y se evitó depender de la API de Jackson donde no hacía falta.

**Conflicto de rutas.** `/api/productos/mis-publicaciones` chocaba con la regla pública
`/api/productos/*` del `SecurityConfig`. Como Spring Security evalúa las reglas en orden, la ruta
entraba como pública, el `Authentication` llegaba en null y reventaba. Se declaró la regla específica
**antes** que la genérica.

**`open-in-view` desactivado.** Se puso `spring.jpa.open-in-view=false` (buena práctica: evita que la
sesión de Hibernate quede abierta durante toda la respuesta HTTP). La contrapartida es que el mapeo
entidad → DTO tiene que pasar **dentro** del método `@Transactional` del servicio, no en el controller.
Por eso los servicios devuelven DTOs ya armados.

---

## 12. Cómo levantarlo

```bash
cd motorroll-api
./mvnw spring-boot:run          # Windows: mvnw.cmd spring-boot:run
```

- API: `http://localhost:8080`
- Consola H2: `http://localhost:8080/h2-console`
  (JDBC URL `jdbc:h2:file:./data/motorroll`, usuario `sa`, sin contraseña)

Para arrancar con la base limpia, borrar la carpeta `data/` y volver a levantar.

Correr los tests:

```bash
./mvnw test
```

---

## 13. Qué queda pendiente

**Para la segunda entrega (21/10) — front-end**
- Interfaz con React + Vite, ruteo con React Router, componentes y hooks.
- Consumo de la API vía `fetch`, renderizado condicional.
- Pantallas: login/registro, catálogo con filtros, detalle de producto, carrito, checkout,
  panel del vendedor, panel de administración.

**Para la tercera entrega (25/11)**
- Manejo de estado global con Redux.
- Ajustes de UX/UI y presentación final.

**Mejoras posibles del back-end (no exigidas por el enunciado)**
- Subida real de archivos de imagen (hoy la publicación guarda las URLs).
- Paginación del catálogo, si la cantidad de productos crece.
- Más tests de integración sobre los controllers.
