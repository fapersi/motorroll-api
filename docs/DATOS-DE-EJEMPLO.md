# Datos precargados — qué es cada cosa y para qué está

**Motorroll API · Primera entrega TPO — Aplicaciones Interactivas, UADE 2C 2026**

Todo esto lo carga la clase `config/DataLoader.java` la primera vez que arranca la aplicación.
Se desactiva con `motorroll.datos-iniciales=false` en `application.properties`.

Ninguno de estos datos es relleno: **cada uno existe para poder demostrar una regla del enunciado.**

Para volver a este estado exacto: frenar la aplicación, borrar la carpeta `data/` y volver a levantar.

---

## 1. Usuarios (5)

| Usuario | Contraseña | Rol | Nombre | Para qué está |
|---|---|---|---|---|
| `admin` | `admin1234` | ADMIN | Gisele Cuello | Administrar cuentas y el ABM de categorías |
| `motorroll` | `vendedor1234` | VENDEDOR | Motorroll Power Test | El vendedor principal: publica 9 de los 12 productos |
| `dynotech` | `vendedor1234` | VENDEDOR | Dyno Tech | El **otro** vendedor: sirve para mostrar el 403 entre vendedores |
| `taller.vtv` | `comprador1234` | COMPRADOR | Martín Álvarez | El comprador de la demo: carrito y checkout |
| `tuning.rp` | `comprador1234` | COMPRADOR | Rocío Paz | El comprador "de descarte": el admin le cambia el rol y lo deshabilita sin romper la demo |

**Las contraseñas nunca se guardan en texto plano:** el `DataLoader` las hashea con BCrypt igual que
el registro normal.

> Detalle: el usuario `admin` está a nombre de **Gisele Cuello**, la docente de la comisión.

---

## 2. Categorías (10)

Hay **una sola con jerarquía** — es la que permite demostrar la relación de `Categoria` consigo misma.

```
Bancos de potencia (id 1)                       ← categoría PADRE
    ├── Inercial (id 2)
    ├── Hidráulico (id 3)
    ├── Mixto (id 4)
    └── Bancos de motos y vehículos especiales (id 5)

Software y electrónica (id 6)                   ← categorías planas
Sensores y equipos auxiliares (id 7)
Equipamiento de sala (id 8)
Repuestos y consumibles (id 9)
Servicios (id 10)
```

| Categoría | Para qué está |
|---|---|
| **Bancos de potencia (1)** con sus 4 hijas | Demostrar la jerarquía. Filtrar por `categoriaId=1` trae **los 5 bancos**, aunque ninguno esté cargado directamente en esa categoría |
| **Inercial (2)** | Tiene 2 productos de **vendedores distintos** → se ve que es un marketplace, no una tienda |
| Cualquiera con productos | Intentar borrarla da **400**: no se pueden dejar productos huérfanos |
| **Servicios (10)** | Agrupa los 2 productos con `esServicio = true` |

---

## 3. Productos (12)

### Los 5 bancos de potencia (categoría padre 1)

| id | Producto | Vendedor | Categoría | Precio | Stock | Desc. | Fotos |
|---|---|---|---|---|---|---|---|
| 1 | Banco de potencia inercial MR-1200 | motorroll | Inercial | 48.500 | 3 | 0% | **2** |
| 2 | Banco inercial compacto DT-800 (tuning) | dynotech | Inercial | 32.900 | 5 | **10%** | 1 |
| 3 | Banco hidráulico de motor MR-H2500 | motorroll | Hidráulico | 128.000 | **1** | 0% | **2** |
| 4 | Banco mixto MR-MX3000 (línea de producción) | motorroll | Mixto | 245.000 | **0** | 0% | 1 |
| 5 | Banco de potencia para motos DT-M500 | dynotech | Motos | 27.400 | 4 | **15%** | 1 |

### El resto del catálogo

| id | Producto | Vendedor | Categoría | Precio | Stock | Desc. |
|---|---|---|---|---|---|---|
| 6 | Licencia software de ensayo DynoWin Pro | motorroll | Software | 1.850 | 25 | 0% |
| 7 | Sonda Lambda de banda ancha | motorroll | Sensores | 690 | 18 | **5%** |
| 8 | Estación de condiciones atmosféricas DT-ATM | dynotech | Sensores | 1.120 | 9 | 0% |
| 9 | Ventilador axial de sala 24" | motorroll | Equip. de sala | 2.450 | 6 | 0% |
| 10 | Kit de rodamientos y correas | motorroll | Repuestos | 430 | 30 | 0% |
| 11 | Calibración y certificación INTI | motorroll | **Servicios** | 3.200 | 8 | 0% |
| 12 | Instalación, puesta en marcha y capacitación | motorroll | **Servicios** | 5.400 | 4 | 0% |

**Reparto:** motorroll 9 · dynotech 3 · 10 productos físicos + 2 servicios.

---

## 4. Por qué cada dato es como es

| Dato | Para qué |
|---|---|
| **MR-MX3000 (id 4) con stock 0** | *"Si el producto no tiene stock no se podrá agregar al carrito"* — requisito literal del enunciado |
| **MR-H2500 (id 3) con stock 1** | Validar el stock **en el checkout**: se agrega 1, y si otro comprador se adelanta, falla |
| **DT-800 con 10%**, DT-M500 con 15%, Sonda Lambda con 5% | Mostrar el cálculo de `precioFinal` = precio × (100 − descuento) / 100 |
| **Producto 1 de motorroll y producto 2 de dynotech** | El 403 entre vendedores: los dos son VENDEDOR, así que Spring Security no puede distinguirlos por rol |
| **Productos 1 y 3 con 2 fotos** | Mostrar la galería y la relación `Producto 1 — N ImagenProducto` |
| **Los 5 bancos tienen ficha técnica; los otros 7 no** | La ficha es **opcional**: es un `@OneToOne` que puede venir en null |
| **Kit de rodamientos: 430** y **MR-MX3000: 245.000** | El más barato y el más caro: sirven para probar los filtros `precioMin` / `precioMax` |
| **Stock 30, 25 y 18 en los productos chicos** | Poder agregar varias unidades al carrito sin quedarse sin stock |
| **Los 2 servicios (11 y 12)** | Se publican como productos con `esServicio = true`, donde el stock son los cupos del mes. **No se modeló una entidad aparte**: reutilizan la misma lógica de publicación, carrito y checkout |
| **Inercial (2) tiene productos de los 2 vendedores** | Se ve que es un marketplace: varios vendedores compiten en la misma categoría |

---

## 5. Fotos (14 archivos, 12 productos)

Están en `src/main/resources/imagenes-demo/` y se cargan **dentro de la base de datos** como BLOB.

| Archivo | Producto |
|---|---|
| `mr1200-a.jpg` + `mr1200-b.jpg` | MR-1200 (id 1) — galería de 2 |
| `dt800-a.jpg` | DT-800 (id 2) |
| `mrh2500-a.jpg` + `mrh2500-b.jpg` | MR-H2500 (id 3) — galería de 2 |
| `mrmx3000-a.jpg` | MR-MX3000 (id 4) |
| `dtm500-a.jpg` | DT-M500 (id 5) |
| `dynowin-a.jpg` | DynoWin Pro (id 6) |
| `lambda-a.jpg` | Sonda Lambda (id 7) |
| `atm-a.jpg` | Estación DT-ATM (id 8) |
| `ventilador-a.jpg` | Ventilador de sala (id 9) |
| `rodamientos-a.jpg` | Kit de rodamientos (id 10) |
| `calibracion-a.jpg` | Calibración INTI (id 11) |
| `instalacion-a.jpg` | Instalación (id 12) |

Si falta alguna, esa publicación queda con una imagen de placeholder por URL y la aplicación
igual arranca.

---

## 6. Fichas técnicas (solo los 5 bancos)

| id | Producto | HP | Vel. máx | Tracción | Rodillo | Peso |
|---|---|---|---|---|---|---|
| 1 | MR-1200 | 1200 | 260 km/h | Simple | 400 mm | 1.850 kg |
| 2 | DT-800 | 800 | 220 km/h | Simple | 350 mm | 1.200 kg |
| 3 | MR-H2500 | 2500 | — | Acople directo al motor | — | 3.400 kg |
| 4 | MR-MX3000 | 3000 | 300 km/h | Integral 4x4 | 500 mm | 5.200 kg |
| 5 | DT-M500 | 500 | 300 km/h | Monotracción | 300 mm | 780 kg |

El MR-H2500 no tiene velocidad ni rodillo porque **no es de rodillos**: se acopla directo al motor.
Es un dato coherente con el rubro, no un campo olvidado.

---

## 7. Ids que se generan durante la demo

Con la base recién borrada:

| Al crear... | Le toca el id |
|---|---|
| Un producto nuevo | **13** |
| Una categoría nueva | **11** |
| Una foto subida | **15** (ya hay 14 cargadas) |
| Un usuario nuevo | **6** |
| La primera orden | **1** |

Si los números no coinciden, la base no arrancó limpia. Ver *Troubleshooting* en la guía de la demo.
