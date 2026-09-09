# Guía para probar y demostrar la API con Insomnia

**Primera entrega TPO — Aplicaciones Interactivas, UADE 2C 2026 · Comisión 6132**

Contenido:

1. **Checklist de preparación** — qué tenés que tener listo *antes* de sentarte a probar.
2. **Guion de la demo** — los 12 pasos, con qué mandar, qué tiene que dar y qué decir.
3. **Preparate para las preguntas** — dónde está cada cosa en el código y las preguntas probables.
4. **Estado de la entrega** — qué se verificó y cómo.
5. **Troubleshooting** y **cómo empaquetar la entrega**.

---

## Parte 1 — Checklist de preparación

### 1.1 Qué tiene que estar instalado

| | Qué | Cómo verificar | Notas |
|---|---|---|---|
| ☐ | **JDK 17 o superior** | `java -version` en la terminal | En esta máquina hay JDK 21, funciona |
| ☐ | **Insomnia** | Ya está instalado (v13.2.0) | La primera vez pide "Continue" en la pantalla de bienvenida |
| ☐ | Maven | **No hace falta instalarlo** | El proyecto trae el wrapper (`mvnw.cmd`) |
| ☐ | MySQL | **No hace falta** | El proyecto usa H2, que viene embebido |

No hay que instalar nada más. Todo lo demás lo baja Maven solo la primera vez que compilás.

### 1.2 Antes de la clase (hacelo una vez, en tu casa)

**a) Que el proyecto compile y los tests pasen**

```bash
cd C:\Repositorios\motorroll-api
./mvnw clean test
```

Tiene que terminar en `BUILD SUCCESS` con **6 tests, 0 fallas**.

**b) Que la aplicación levante**

```bash
./mvnw spring-boot:run
```

Esperá a ver `Started MotorrollApiApplication`. La API queda en `http://localhost:8080`.
Para frenarla: `Ctrl+C` en esa terminal.

> **Importante:** la primera vez que compila baja todas las dependencias de internet. Puede tardar
> varios minutos. **No dejes esto para el momento de la demo** — si en el aula la red anda mal, no
> arranca. Una vez que están bajadas quedan en caché y arranca en ~15 segundos.

**c) Importar la colección en Insomnia**

1. Abrí Insomnia → si aparece la pantalla de bienvenida, **Continue**.
2. Arriba a la izquierda, menú de la app → **Import** (o el botón `+` → *Import*).
3. Elegí **From File** y seleccioná:
   `C:\Repositorios\motorroll-api\insomnia\Motorroll-API-Entrega1.insomnia.json`
4. Confirmá. Te va a aparecer la colección **"Motorroll API - Entrega 1"** con 8 carpetas.
5. Arriba a la izquierda de la colección, en el selector de environment, elegí **Local**.

Con eso ya tenés los 61 requests armados, con los JSON del body escritos, el header
`Authorization: Bearer ...` puesto donde corresponde y el archivo de la subida de fotos ya elegido.

> ⚠️ **Si ya habías importado una versión anterior:** borrá primero la colección vieja en Insomnia
> (clic derecho sobre ella → *Delete*) y recién ahí importá. Si quedan las dos, Insomnia mezcla los
> identificadores internos y algunos requests fallan con *"Could not find request ..."*.

**d) Probá la demo entera una vez, sola, de principio a fin.** Es la única forma de que el día de
la entrega no te sorprenda nada.

### 1.3 El día de la demo (5 minutos antes)

| ☐ | Paso |
|---|---|
| ☐ | Abrir la terminal en `C:\Repositorios\motorroll-api` |
| ☐ | **Borrar la carpeta `data/`** (así la base arranca limpia y los ids son los del guion) |
| ☐ | Correr `./mvnw spring-boot:run` y esperar `Started MotorrollApiApplication` |
| ☐ | Abrir Insomnia con el environment **Local** seleccionado |
| ☐ | Tirar el primer request (`Listar catálogo`) para confirmar que responde |
| ☐ | Dejar abierto el proyecto en el IDE, en `CarritoServiceImpl.java` (es lo que más van a preguntar) |

Para borrar la base:

```bash
rm -rf data/
```

> ⚠️ **Ojo con esto:** para que el borrado sirva, la aplicación tiene que estar **realmente
> frenada**. Si cerrás la terminal sin hacer `Ctrl+C`, el proceso de Java sigue vivo en segundo
> plano y vuelve a escribir la carpeta `data/` con los datos viejos — y arrancás la demo con el
> stock ya descontado y los ids corridos. Ver *Troubleshooting* más abajo.

### 1.4 Usuarios de prueba (ya cargados)

| Usuario | Contraseña | Rol |
|---|---|---|
| `admin` | `admin1234` | ADMIN |
| `motorroll` | `vendedor1234` | VENDEDOR |
| `dynotech` | `vendedor1234` | VENDEDOR |
| `taller.vtv` | `comprador1234` | COMPRADOR |
| `tuning.rp` | `comprador1234` | COMPRADOR |

### 1.5 Productos con los que se muestran los casos de borde

| id | Producto | Precio | Stock | Desc. | Para qué sirve en la demo |
|---|---|---|---|---|---|
| 1 | Banco inercial MR-1200 | 48.500 | 3 | 0% | El caso feliz: agregar y comprar |
| 2 | Banco DT-800 | 32.900 | 5 | **10%** | Mostrar el cálculo `precioFinal` = 29.610 |
| 3 | Banco hidráulico MR-H2500 | 128.000 | **1** | 0% | Validación de stock en el checkout |
| 4 | Banco mixto MR-MX3000 | 245.000 | **0** | 0% | "Sin stock, no se puede agregar" |
| 5 | Banco de motos DT-M500 | 27.400 | 4 | **15%** | Otro descuento |

---

## Parte 2 — Guion de la demo, paso a paso

Doce pasos, unos 15 minutos. Cada uno dice **qué mandar**, **qué tiene que dar** y **qué decir**.

Este guion está probado de punta a punta con la base recién borrada: los números que figuran
(ids, totales, stock) son los que van a salir si arrancás limpia.

> **Antes de empezar:** los tres logins del Paso 3 son el chequeo clave. Si dan `200` y las tres
> variables del environment se llenan, el resto de la demo sale solo.

---

### Paso 1 — Registro de un comprador

**`1. Auth` → "Registro COMPRADOR"**

**Da:** `201 Created`, usuario `escuderia.tc` con `"id": 6`

> *"Se registró un comprador. La respuesta trae el usuario y su token, pero **no trae la
> contraseña**. Nunca la devolvemos, y tampoco la guardamos en texto plano: va hasheada con BCrypt."*

---

### Paso 2 — La regla que frena el duplicado

**`1. Auth` → "Registro con username repetido → 409"**

**Da:** `409 Conflict` — *"El nombre de usuario admin ya esta en uso"*

> *"Si intento registrar un usuario que ya existe, la API lo rechaza. Y devuelve un JSON prolijo con
> el motivo, no un stacktrace."*

Es el par del paso anterior: primero funciona, después la regla lo frena.

---

### Paso 3 — Los tres logins

**`1. Auth`** → mandá los tres, en orden:

1. **Login COMPRADOR** → `200`
2. **Login VENDEDOR** → `200`
3. **Login ADMIN** → `200`

> *"Cada login devuelve un token firmado que vence en 24 horas. De acá en adelante, todo request que
> necesite identidad lo manda en la cabecera `Authorization`."*

**Comprobación:** apretá `Ctrl+E`. Las tres variables (`token`, `tokenVendedor`, `tokenAdmin`) tienen
que tener un texto largo que empieza con `eyJhbGci...`

---

### Paso 4 — El catálogo es público

**`2. Productos` → "Listar catalogo (sin token)"**

**Da:** `200` con **12 productos**

> *"12 productos, y fijate que este request **no manda ningún token**. El catálogo es público: entrás
> y ves, igual que en MercadoLibre. Recién cuando querés comprar te pide identificarte."*

**Remate opcional:** abrí `http://localhost:8080/api/productos` en Chrome.
*"Es la misma API desde el navegador, sin ninguna herramienta."*

---

### Paso 5 — La jerarquía de categorías

**`2. Productos` → "Filtrar por categoria PADRE (trae subcategorias)"**

**Da:** `200` con **5 productos** (los bancos)

> *"Filtré por la categoría 1, 'Bancos de potencia'. Me trae 5, pero **ninguno está cargado en esa
> categoría**: están en Inercial, Hidráulico, Mixto y Motos. La categoría tiene una relación consigo
> misma, y el filtro busca en ella y en todas sus subcategorías."*

**Para señalar:** el primer resultado es el DT-M500, cuya `categoriaId` es **5**, no 1.

---

### Paso 6 — El cálculo del descuento

**`2. Productos` → "Detalle con descuento (32900 → 29610)"**

**Da:** `"precio": 32900.00` y `"precioFinal": 29610.00`, con `"descuento": 10`

> *"El DT-800 tiene 10% de descuento. En la base guardamos el precio de lista y el porcentaje; el
> precio final **se calcula al consultar**, no se guarda. Si mañana cambia el descuento, no hay que
> recalcular nada."*

---

### Paso 7 — Sin token no hay carrito

**`5. Carrito` → "Ver carrito SIN token → 401"**

**Da:** `401` — *"Necesitas iniciar sesion para acceder a este recurso"*

> *"Hasta acá todo era público. El carrito ya no. La API es **stateless**: no guarda sesión en el
> servidor, así que cada request tiene que traer su token. Este no lo manda, y lo frena Spring
> Security antes de llegar al controller."*

---

### Paso 8 — Armar el carrito

Mandá estos tres seguidos, en `5. Carrito`:

1. **"Ver carrito"** → `200`, carrito vacío con `"id": 1`
2. **"Agregar producto al carrito"** → `201` (MR-1200 × 1)
3. **"Agregar un segundo producto (con descuento)"** → `201` (DT-800 × 2)

**El carrito queda así:**

```
MR-1200   x1  a 48.500          = 48.500
DT-800    x2  a 29.610 (-10%)   = 59.220
                          TOTAL = 107.720
```

> *"Mismo endpoint que antes, pero ahora con token. Si no existe un carrito abierto, lo crea. Agrego
> dos productos y el carrito devuelve el total ya calculado — y para el DT-800 usa el precio con
> descuento, no el de lista."*

**Anotá dos cosas** para compararlas en el Paso 11:

- El total: **107.720**
- Que el **stock todavía NO bajó**. En la respuesta, cada ítem trae `"stockDisponible"`: el MR-1200
  sigue en **3**. El stock se descuenta recién en el checkout.

---

### Paso 9 — Las dos validaciones de stock

Mandá los dos, en `5. Carrito`:

| Request | Da | Mensaje |
|---|---|---|
| **"Agregar producto SIN stock → 400"** | `400` | *"El producto Banco mixto MR-MX3000 esta sin stock"* |
| **"Pedir mas unidades de las disponibles → 400"** | `400` | *"Disponible: 3, pediste: 100"* |

> *"El primero es el requisito literal del enunciado: si el producto no tiene stock, no se puede
> agregar. El segundo pide de más, y el mensaje dice exactamente cuántas hay."*

**Detalle fino que suma:** el request manda 99, pero el mensaje dice **100**. Es porque ya había 1 en
el carrito: la validación suma lo que pedís a lo que ya está adentro, no lo mira aislado.

---

### Paso 10 — El CHECKOUT

**`5. Carrito` → "CHECKOUT (confirmar la compra)"**

**Da:** `201 Created` con la orden `id: 1`, estado `CONFIRMADA`, **`total: 107720.00`**

> *"El checkout revalida el stock ítem por ítem, calcula el total, genera la orden, descuenta el
> stock y cierra el carrito. Todo el método es `@Transactional`: si fallara la validación del segundo
> ítem, se revierte el descuento del primero. No queda una compra a medias."*
>
> *"Y la orden **congela** el nombre y el precio del momento: si mañana el vendedor cambia el precio,
> esta orden no cambia."*

**Para señalar en la respuesta:** cada ítem trae `nombreProducto`, `precioUnitario` y
`descuentoAplicado` guardados, no calculados al vuelo.

---

### Paso 11 — Mostrar que el checkout hizo efecto

Mandá estos tres:

| Request | Da |
|---|---|
| `6. Ordenes` → **"Mis ordenes"** | La orden 1, total 107.720 |
| `6. Ordenes` → **"Verificar stock descontado post-checkout"** | MR-1200 con **`"stock": 2`** (era 3) |
| `5. Carrito` → **"Ver carrito"** | Carrito **id 2**, vacío |

> *"Queda la orden en el historial, el stock bajó de 3 a 2, y el carrito viejo pasó a CONFIRMADO: ya
> se abrió uno nuevo y vacío. Todo eso pasó dentro de la misma transacción."*

**Si preguntan "¿cómo sabés que antes había 3?":** arriba a la derecha del panel de respuesta, donde
dice *"Just Now"*, hay un desplegable con el **historial de respuestas** de ese mismo request. Ahí
está la respuesta anterior con `"stock": 3`. También figura en la respuesta del Paso 8, en el campo
`stockDisponible` de cada ítem.

---

### Paso 12 — Las fotos

**Carpeta `3b. Fotos del producto (multipart)`.** Mandá los tres:

**1. "Ver la foto (publico, se abre en el navegador)"** → `200`, se ve la imagen en el panel derecho

> *"Esta imagen no es un link a internet: son los bytes guardados en nuestra base de datos. Y es
> pública, fijate que no mandamos token — igual que el catálogo."*

**2. "Ver la foto en base64 (formato de la catedra)"** → `200` con `contentType`, `tamanioBytes` y `base64`

> *"El mismo archivo en el formato que vimos en clase. El front lo usa así:*
> `<img src={data:image/jpeg;base64,${base64}} />`*. Tenemos las dos formas porque para el navegador
> conviene la imagen directa, y para meterla dentro de un JSON conviene base64."*

**3. "SUBIR una foto (multipart/form-data)"** → `201`, devuelve **`"id": 15`**

**Antes de darle Send, abrí la pestaña `Body`.** Ahí está lo importante: no es JSON, es un formulario
con un campo `imagen` de tipo archivo.

> *"Este request es distinto a todos los demás de la API. Los otros mandan JSON; este manda
> `multipart/form-data`, porque JSON es texto y una imagen es binaria. Por eso el método recibe un
> `MultipartFile` en vez de un `@RequestBody`."*

**Comprobación:** volvé a `2. Productos` → **"Detalle de producto"**. La galería pasó de 2 a **3 fotos**.

---

## Extras, si sobra tiempo

### Los permisos (2 minutos)

Cuatro requests seguidos, todos tienen que fallar:

| Request | Da | Qué decir |
|---|---|---|
| `3b` → **Subir a producto de OTRO vendedor** | `403` | *"Seguimos como motorroll, pero el producto 2 lo publicó dynotech. Los dos son VENDEDOR, así que Spring Security no los puede distinguir por rol: esto se valida a mano en el servicio, comparando el id del vendedor"* |
| `3` → **COMPRADOR intenta publicar** | `403` | *"Un comprador no publica"* |
| `3` → **DTO inválido** | `400` | *"Devuelve el error campo por campo"* |
| `7` → **COMPRADOR lista usuarios** | `403` | *"Esta sí la corta Spring Security por rol"* |

### Publicar y administrar (3 minutos)

| Request | Da |
|---|---|
| `3` → **Alta de publicación** | `201`, **anotá el id: 13** |
| `3` → **Manejar el stock (PATCH)** | El vendedor administra su stock |
| `3` → **Aplicar descuento 20%** | 72.900 → 58.320 |
| `3` → **Eliminar publicación** | `204`. Es **baja lógica**: `activo = false` |
| `3` → **Mis publicaciones** | El producto borrado **sigue apareciendo** con `activo: false` |
| `7` → **Cambiar el ROL de una cuenta** | Administración de permisos |
| `7` → **Deshabilitar una cuenta** + **Cuenta deshabilitada intenta loguear** | `401` |
| `4` → **Borrar categoría CON productos** | `400`, no se dejan productos huérfanos |

> Si el alta devolvió un id distinto de 13, corregí la URL de los requests que le siguen.

### El cierre con la consola H2

Abrí `http://localhost:8080/h2-console` (JDBC `jdbc:h2:file:./data/motorroll`, usuario `sa`, sin
contraseña) y mostrá las tablas reales. Las cuatro consultas que mejor quedan:

```sql
SELECT id, nombre, stock, precio, descuento FROM productos WHERE id IN (1,2);
```

```sql
SELECT o.id AS orden, o.estado, o.total,
       i.nombre_producto, i.cantidad, i.precio_unitario, i.descuento_aplicado, i.subtotal
FROM ordenes o
JOIN items_orden i ON i.orden_id = o.id;
```

```sql
SELECT c.id, c.estado, u.username
FROM carritos c JOIN usuarios u ON u.id = c.comprador_id;
```

```sql
SELECT username, email, rol, password FROM usuarios;
```

La segunda muestra la relación `Orden 1 — N ItemOrden` con los precios congelados. La tercera muestra
el carrito **CONFIRMADO** y el nuevo **ABIERTO**. La última muestra que las contraseñas son hashes
`$2a$10$...`, no texto plano.

Y esta muestra la tabla unida **consigo misma**, que es la jerarquía de categorías:

```sql
SELECT h.id, h.nombre AS subcategoria, p.nombre AS categoria_padre
FROM categorias h LEFT JOIN categorias p ON p.id = h.categoria_padre_id;
```

**Ojo:** la consola funciona **mientras la aplicación corre**. No la frenes para abrirla.

---

## Los tres números que podés tener que ajustar en vivo

| Dónde | Qué |
|---|---|
| **Borrar una foto** (`3b`) | El id final de la URL → el que devolvió la subida (15 con base limpia) |
| **Editar / stock / descuento / eliminar publicación** (`3`) | El id → el que devolvió el alta (13 con base limpia) |
| **Editar / borrar categoría** (`4`) | El id → el que devolvió el alta (11 con base limpia) |

Si arrancás con `data/` borrada, esos tres números son siempre 15, 13 y 11.

---

## Parte 3 — Preparate para las preguntas

Según lo que dijo la docente en la Clase 5, después de la demo vienen preguntas **individuales**:
te van a preguntar qué parte hiciste vos y te van a pedir que **abras el código y muestres dónde
está** esa lógica. No alcanza con que la demo funcione.

### Dónde está cada cosa (para no buscar en vivo)

| Si preguntan por... | Abrí este archivo |
|---|---|
| **Subida de fotos (multipart)** | `controller/ProductoController.java`, método `subirImagen` |
| Cómo se guardan los bytes de la foto | `model/ImagenProducto.java` (`@Lob byte[] datos`) |
| Login, generación del token | `service/impl/AuthServiceImpl.java` |
| Cómo se firma y valida el JWT | `security/JwtService.java` |
| Cómo se valida el token en cada request | `security/JwtAuthenticationFilter.java` |
| Qué ruta pide qué rol | `config/SecurityConfig.java` |
| Carrito: agregar, modificar, eliminar | `service/impl/CarritoServiceImpl.java` |
| **Checkout** (lo más preguntado) | `service/impl/CarritoServiceImpl.java`, método `checkout` |
| Filtros del catálogo | `service/impl/ProductoServiceImpl.java` |
| Relaciones entre tablas | `model/` (`Producto.java`, `Carrito.java`, `Orden.java`) |
| Manejo de errores | `exception/ManejadorGlobalDeExcepciones.java` |

### Preguntas que casi seguro van a caer

**¿Por qué el token viaja en cada request y no se guarda la sesión en el servidor?**
Porque la API es *stateless*: no guarda estado de sesión. El token viaja firmado, el servidor solo
verifica la firma con su clave secreta. Así la API escala y no depende de que el cliente hable
siempre con el mismo servidor.

**¿Para qué usan DTOs si ya tienen las entidades?**
Tres motivos: (1) la entidad `Usuario` tiene el hash de la contraseña y no queremos exponerlo;
(2) las relaciones son bidireccionales y serializarlas entra en recursión infinita; (3) lo que el
cliente manda no es lo mismo que lo que la base guarda.

**¿Para qué sirve `@Transactional` en el checkout?**
Por atomicidad (la A de ACID). El checkout descuenta stock de varios productos. Si falla la
validación del tercero, se revierte el descuento de los dos primeros. No queda una compra a medias.

**¿Por qué el stock se revalida en el checkout y no solo al agregar al carrito?**
Porque entre que alguien agrega algo al carrito y confirma pueden pasar horas, y otro comprador se
pudo haber llevado la última unidad.

**¿Por qué el DELETE de producto no borra la fila?**
Baja lógica (`activo = false`). Un borrado físico rompería el historial de órdenes de otros
usuarios, que siguen referenciando ese producto.

**¿Por qué las contraseñas se guardan con BCrypt y no en texto plano?**
Porque si alguien accede a la base no puede leerlas. BCrypt es de una sola vía: en el login no se
"desencripta", se vuelve a hashear lo que mandó el usuario y se comparan los hashes.

**¿Por qué la subida de fotos no usa JSON como el resto de la API?**
Porque JSON es texto y una imagen es binaria. Meterla en el JSON obligaría a mandarla en base64,
que la agranda un 33%. Con `multipart/form-data` el archivo viaja tal cual, y por eso el método
recibe un `MultipartFile` en vez de un `@RequestBody`.

**¿Por qué la interfaz `Service` separada de la `ServiceImpl`?**
Para que el controller dependa de la abstracción y no de la implementación concreta. Se puede
cambiar la implementación sin tocar el controller.

---

## Parte 4 — Estado de la entrega (verificado)

Se compiló, se corrieron los tests y se probó la API corriendo, endpoint por endpoint.

- ✅ `./mvnw clean test` → **BUILD SUCCESS, 6 tests, 0 fallas**
- ✅ La aplicación levanta en `localhost:8080` desde cero y carga los datos de ejemplo
  (5 usuarios, 10 categorías, 12 productos con sus 14 fotos)
- ✅ Se probaron **28 casos** sobre la API corriendo: catálogo, filtros, login de los tres roles,
  carrito completo, checkout con descuento de stock, órdenes, alta/edición/baja de productos,
  subida y borrado de fotos por multipart, administración de categorías y usuarios, y los códigos
  de error 400/401/403/404/405/409
- ✅ Los 12 pasos de la demo se corrieron uno por uno en Insomnia, con la base recién borrada

### Cobertura del enunciado

| Requisito del enunciado | Estado |
|---|---|
| Registro de compradores y vendedores (usuario, mail, contraseña, nombre, apellido) | ✅ |
| Autenticación con usuario y contraseña | ✅ |
| Administración de cuentas con asignación de permisos | ✅ |
| Visualización de productos con fotografía y precio | ✅ |
| Búsqueda y filtrado por categoría, precio, etc. | ✅ |
| Detalle del producto con imagen y descripción | ✅ |
| Añadir productos al carrito | ✅ |
| Producto sin stock indicado y no agregable | ✅ |
| Carrito: agregar, eliminar, modificar | ✅ |
| Checkout con cálculo automático del total | ✅ |
| Descuento de stock con validación previa | ✅ |
| Alta de publicación con **una o más fotos** | ✅ |
| Descripción + categoría + precio en la publicación | ✅ |
| El vendedor maneja el stock | ✅ |
| El vendedor elimina el producto | ✅ |
| Gestión de descuentos individuales | ✅ |
| API REST para acceder a la información completa o filtrada | ✅ |
| Capa de persistencia | ✅ |

### Sobre las fotos

El catalogo arranca con **fotos reales**, guardadas en la base de datos. Estan en
`src/main/resources/imagenes-demo/` y el `DataLoader` las carga la primera vez que levanta la
aplicacion. Si falta alguna, esa publicacion queda con una imagen de placeholder y la aplicacion
igual arranca.

Ademas se implemento la **subida por multipart**, siguiendo el material de la catedra:

| Metodo | Ruta | Quien |
|---|---|---|
| POST | `/api/productos/{id}/imagenes` | vendedor duenio (multipart/form-data) |
| GET | `/api/productos/{id}/imagenes/{imagenId}/contenido` | publico (devuelve la imagen) |
| GET | `/api/productos/{id}/imagenes/{imagenId}` | publico (devuelve base64) |
| DELETE | `/api/productos/{id}/imagenes/{imagenId}` | vendedor duenio |

La entidad `ImagenProducto` soporta las dos formas: **archivo subido** (bytes en una columna BLOB
mas su `contentType`) o **URL externa**. En el JSON del producto cada imagen dice cual es, en el
campo `tipo`.

Si preguntan por que los bytes estan en la misma tabla y no en una aparte: con este volumen (unas
pocas fotos de ~50 KB) no molesta, pero si el catalogo creciera lo correcto seria moverlos a una
tabla separada o a un servicio de archivos y dejar en la base solo la referencia. Esta anotado en
un comentario en la propia entidad.

---

## Troubleshooting

### "Los stocks no coinciden con la guía" / "el alta me dio id 14 en vez de 13"

La base no arrancó limpia. Pasa cuando quedó un proceso de Java vivo que vuelve a escribir `data/`
después de que la borrás. Solución, en PowerShell:

```powershell
Get-CimInstance Win32_Process -Filter "Name='java.exe'" | Select-Object ProcessId, CommandLine
```

Buscá el que dice `MotorrollApiApplication` y el de `apache-maven` (los que dicen
`redhat.java` son de VS Code, **no los toques**). Frenalos:

```powershell
Stop-Process -Id <el numero> -Force
```

Después recién ahí `rm -rf data/` y volvé a levantar.

### "Address already in use: bind" al levantar

Ya hay una instancia corriendo en el 8080. Mismo procedimiento que arriba.

### "Insomnia me devuelve 401 en todo"

El token no se resolvió. Entrá al environment **Local**, borrá el contenido de la variable `token`
y pegá a mano el valor que devolvió el request *Login COMPRADOR*. Ídem `tokenVendedor` y
`tokenAdmin` si los necesitás.

### "Connection refused" / "Failed to connect"

La API no está levantada, o tarda. Esperá a ver `Started MotorrollApiApplication` en la terminal
antes de tirar el primer request.

### Ver los datos por dentro

Consola web de H2: `http://localhost:8080/h2-console`
JDBC URL `jdbc:h2:file:./data/motorroll`, usuario `sa`, contraseña vacía.
Sirve para mostrar en vivo que las tablas y las relaciones existen de verdad.

---

## Parte 5 — Cómo empaquetar la entrega

El formato pedido en el campus es:

```
EntregaBack_grupoX_apellido de los integrantes
```

Antes de comprimir, **borrá estas carpetas** (son generadas o material de contexto, no son parte
del código):

- `target/` — compilados
- `data/` — la base de datos local
- `notas/` — material de la cursada (ya está en `.gitignore`)

Entrega **un solo integrante** del grupo.
