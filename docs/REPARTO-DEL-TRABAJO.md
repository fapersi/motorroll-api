# Reparto del trabajo entre 4 personas

El back-end de la primera entrega ya está armado y funcionando. Lo que sigue no es "programar de
cero", sino **repartir la propiedad de cada módulo**: cada uno se hace dueño de una parte, la entiende,
la puede explicar frente a la profesora, la corrige si aparece un bug, y después arranca la parte del
front que le corresponde.

La división está pensada para que las cuatro partes sean parejas en tamaño y, sobre todo, para que
**no se pisen entre sí**: cada módulo toca paquetes distintos, así no hay conflictos al mergear.

---

## Criterio de la división

| | Módulo | Peso aproximado |
|---|---|---|
| 1 | Autenticación y usuarios | ~18 clases |
| 2 | Catálogo: productos y categorías | ~22 clases |
| 3 | Carrito, checkout y órdenes | ~16 clases |
| 4 | Infraestructura, calidad y entrega | ~20 clases + documentación |

---

## Persona 1 — Autenticación y usuarios

**Es dueña de:**

```
model/Usuario.java, model/Rol.java
repository/UsuarioRepository.java
service/AuthService.java + impl/AuthServiceImpl.java
service/UsuarioService.java + impl/UsuarioServiceImpl.java
controller/AuthController.java, controller/UsuarioController.java
dto/auth/ (3), dto/usuario/ (4)
mapper/UsuarioMapper.java
security/JwtService.java, security/JwtAuthenticationFilter.java
config/SecurityConfig.java
```

**Tiene que poder explicar:**
- Qué es un JWT, qué lleva adentro y por qué la API es *stateless*.
- Por qué la contraseña se guarda hasheada con BCrypt y nunca se devuelve en la respuesta.
- Cómo el `JwtAuthenticationFilter` deja al usuario autenticado en el contexto de Spring Security.
- Cómo se resuelve la asignación de permisos: rol en el token → `hasRole()` en las rutas.

**Le toca en la 2ª entrega:** pantallas de login y registro, guardado del token en el cliente,
rutas protegidas del front y el panel de administración de cuentas.

---

## Persona 2 — Catálogo: productos y categorías

**Es dueña de:**

```
model/Producto.java, model/Categoria.java, model/ImagenProducto.java, model/FichaTecnica.java
repository/ProductoRepository.java, repository/CategoriaRepository.java
service/ProductoService.java + impl/ProductoServiceImpl.java
service/CategoriaService.java + impl/CategoriaServiceImpl.java
controller/ProductoController.java, controller/CategoriaController.java
dto/producto/ (9), dto/categoria/ (2)
mapper/ProductoMapper.java, mapper/CategoriaMapper.java
```

**Tiene que poder explicar:**
- La consulta de búsqueda con filtros opcionales: por qué `:parametro IS NULL OR ...` hace que un
  filtro en null no filtre nada.
- Por qué filtrar por una categoría padre trae también los productos de las subcategorías
  (el `LEFT JOIN` a `categoriaPadre`).
- Cómo se calcula el precio con descuento (`calcularPrecioFinal()`).
- Por qué el `DELETE` es baja lógica y no borra la fila.
- Cómo se resuelve que un vendedor solo pueda tocar sus propias publicaciones.

**Le toca en la 2ª entrega:** grilla del catálogo, filtros y búsqueda, página de detalle del
producto y el panel del vendedor (alta/edición de publicaciones).

---

## Persona 3 — Carrito, checkout y órdenes

**Es dueña de:**

```
model/Carrito.java, model/ItemCarrito.java, model/EstadoCarrito.java
model/Orden.java, model/ItemOrden.java, model/EstadoOrden.java
repository/CarritoRepository.java, repository/OrdenRepository.java
service/CarritoService.java + impl/CarritoServiceImpl.java
service/OrdenService.java + impl/OrdenServiceImpl.java
controller/CarritoController.java, controller/OrdenController.java
dto/carrito/ (4), dto/orden/ (2)
mapper/CarritoMapper.java, mapper/OrdenMapper.java
```

**Tiene que poder explicar:**
- Por qué cada comprador tiene un solo carrito ABIERTO y qué pasa con él después del checkout.
- Los 7 pasos del checkout (están en la doc) y por qué el stock se revalida **al confirmar** y no
  al agregar al carrito.
- Por qué el método es `@Transactional`: si falla el tercer ítem, se revierte el descuento de los
  dos primeros.
- Por qué `ItemOrden` congela nombre, precio y descuento del momento de la compra.
- Cómo funciona `orphanRemoval = true` al eliminar un ítem del carrito.

**Es la parte más delicada del negocio**, así que conviene que la tome alguien que se sienta cómodo
con la lógica. A cambio, es la que menos clases tiene.

**Le toca en la 2ª entrega:** carrito, modificación de cantidades, pantalla de checkout con el
resumen del total y el historial de compras.

---

## Persona 4 — Infraestructura, calidad y entrega

**Es dueña de:**

```
pom.xml, application.properties, application-test.properties
exception/ (6 clases, incluido el ManejadorGlobalDeExcepciones)
dto/common/ApiError.java
config/DataLoader.java
src/test/ (los 6 tests)
README.md, docs/, postman/DynoMarket.postman_collection.json
```

**Tiene que poder explicar:**
- Cómo funciona el `@RestControllerAdvice`: por qué la API devuelve siempre el mismo JSON de error
  en lugar de un stacktrace.
- Qué código HTTP corresponde a cada situación (400 / 401 / 403 / 404 / 409) y por qué.
- Cómo se validan los DTOs con las anotaciones y cómo se arma el detalle campo por campo.
- Por qué los tests corren contra una base H2 en memoria y no contra la de desarrollo.

**Además le toca:**
- Mantener el README y la documentación actualizados.
- Mantener la colección de Postman al día cuando alguien agregue un endpoint.
- **Armar y ensayar la demo de la entrega** (que es lo que ve la profesora).
- Coordinar los merges de las ramas del resto.

Esta parte parece "menos código", pero es la que se lleva la presentación y la que evita que el día de
la entrega no arranque nada. Si el grupo prefiere, esta persona también puede tomar los tests de
integración de los controllers, que hoy no están.

---

## Reglas de trabajo sugeridas

1. **Una rama por persona**, del estilo `feat/auth-usuarios`, `feat/catalogo`, `feat/carrito`,
   `feat/infra`. Nunca trabajar directo sobre `main`.
2. **Nadie edita archivos de otro módulo sin avisar.** Si hace falta tocar algo compartido
   (`SecurityConfig`, `pom.xml`), se avisa en el grupo antes.
3. **Antes de mergear:** `./mvnw test` tiene que pasar. Si rompe, no se mergea.
4. Los DTOs y mappers son la frontera entre módulos: si el front necesita un campo nuevo, se agrega
   al DTO, no se devuelve la entidad.
5. Cada uno prueba su parte en Postman antes de decir que está lista.

---

## Cómo se ve en la segunda entrega

El mismo reparto se traslada casi igual al front, así cada uno sigue trabajando sobre lo que ya conoce:

| Persona | Back-end (1ª entrega) | Front-end (2ª entrega) |
|---|---|---|
| 1 | Auth y usuarios | Login, registro, rutas protegidas, panel admin |
| 2 | Catálogo | Grilla, filtros, detalle, panel del vendedor |
| 3 | Carrito y checkout | Carrito, checkout, historial de compras |
| 4 | Infra y calidad | Layout, ruteo, cliente HTTP, manejo de errores, demo |
