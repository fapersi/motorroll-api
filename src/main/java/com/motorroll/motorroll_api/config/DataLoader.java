package com.motorroll.motorroll_api.config;

import com.motorroll.motorroll_api.model.Categoria;
import com.motorroll.motorroll_api.model.FichaTecnica;
import com.motorroll.motorroll_api.model.ImagenProducto;
import com.motorroll.motorroll_api.model.Producto;
import com.motorroll.motorroll_api.model.Rol;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.CategoriaRepository;
import com.motorroll.motorroll_api.repository.ProductoRepository;
import com.motorroll.motorroll_api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * Carga un catalogo de demostracion la primera vez que se levanta la aplicacion,
 * para poder probar la API sin tener que cargar todo a mano.
 *
 * Se desactiva poniendo motorroll.datos-iniciales=false en application.properties.
 */
@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "motorroll.datos-iniciales", havingValue = "true", matchIfMissing = true)
public class DataLoader implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (usuarioRepository.count() > 0) {
            log.info("La base ya tiene datos, no se cargan los datos de ejemplo.");
            return;
        }

        log.info("Cargando datos de ejemplo de DynoMarket...");

        // ------------------------------------------------------------------
        // Usuarios
        // ------------------------------------------------------------------
        Usuario admin = crearUsuario("admin", "admin@dynomarket.com", "admin1234",
                "Gisele", "Cuello", Rol.ADMIN);

        Usuario motorroll = crearUsuario("motorroll", "ventas@motorroll.com", "vendedor1234",
                "Motorroll", "Power Test", Rol.VENDEDOR);

        Usuario dynotech = crearUsuario("dynotech", "info@dynotech.com.ar", "vendedor1234",
                "Dyno", "Tech", Rol.VENDEDOR);

        crearUsuario("taller.vtv", "compras@vtvcentro.com.ar", "comprador1234",
                "Martin", "Alvarez", Rol.COMPRADOR);

        crearUsuario("tuning.rp", "info@rpperformance.com.ar", "comprador1234",
                "Rocio", "Paz", Rol.COMPRADOR);

        // ------------------------------------------------------------------
        // Categorias (arbol: bancos de potencia con sus cuatro tipos)
        // ------------------------------------------------------------------
        Categoria bancos = crearCategoria("Bancos de potencia",
                "Dinamometros de rodillos y de motor para medir potencia y torque", null);

        Categoria inercial = crearCategoria("Inercial",
                "Genera resistencia con volantes o rodillos de gran masa. El mas simple y economico", bancos);

        Categoria hidraulico = crearCategoria("Hidraulico",
                "Freno dinamometrico que absorbe la potencia y permite ensayos sostenidos", bancos);

        Categoria mixto = crearCategoria("Mixto",
                "Combina freno y volantes inerciales: simula aerodinamica y peso del vehiculo", bancos);

        Categoria motos = crearCategoria("Bancos de motos y vehiculos especiales",
                "Rampas y bancos para motos, cuatriciclos y furgones", bancos);

        Categoria software = crearCategoria("Software y electronica",
                "Software de ensayo, curvas de potencia y modulos de adquisicion de datos", null);

        Categoria sensores = crearCategoria("Sensores y equipos auxiliares",
                "Sondas Lambda, celdas de carga, sensores de RPM y estaciones atmosfericas", null);

        Categoria sala = crearCategoria("Equipamiento de sala",
                "Ventilacion, aislacion acustica y sistemas de amarre del vehiculo", null);

        Categoria repuestos = crearCategoria("Repuestos y consumibles",
                "Rodillos, rodamientos, correas, kits de calibracion y cableados", null);

        Categoria servicios = crearCategoria("Servicios",
                "Calibracion con trazabilidad INTI, instalacion, puesta en marcha y capacitacion", null);

        // ------------------------------------------------------------------
        // Productos
        // ------------------------------------------------------------------
        Producto inercial1 = crearProducto(motorroll, inercial,
                "Banco de potencia inercial MR-1200",
                "Dinamometro de rodillos inercial para autos de traccion simple. Volante inercial calibrado, "
                        + "adquisicion de RPM por pinza inductiva y generacion automatica de curvas de potencia y torque.",
                new BigDecimal("48500.00"), 3, "Motorroll", 0, false,
                List.of("https://picsum.photos/seed/mr1200a/800/600", "https://picsum.photos/seed/mr1200b/800/600"));
        asignarFicha(inercial1, 1200, 260, "Simple", 400, new BigDecimal("1850.00"),
                "Foso de 4.5 x 2.2 m, piso de hormigon armado y toma trifasica");

        Producto inercial2 = crearProducto(dynotech, inercial,
                "Banco inercial compacto DT-800 para tuning",
                "Pensado para talleres de preparacion: mide la ganancia real de cada modificacion y permite "
                        + "comparar corridas antes y despues del remapeo de ECU.",
                new BigDecimal("32900.00"), 5, "DynoTech", 10, false,
                List.of("https://picsum.photos/seed/dt800a/800/600"));
        asignarFicha(inercial2, 800, 220, "Simple", 350, new BigDecimal("1200.00"),
                "Sala de 5 x 3 m con extraccion de gases");

        Producto hidraulico1 = crearProducto(motorroll, hidraulico,
                "Banco hidraulico de motor MR-H2500",
                "Freno dinamometrico hidraulico para ensayos de larga duracion y homologacion. "
                        + "El par motor se absorbe y se transforma en calor transferido al agua.",
                new BigDecimal("128000.00"), 1, "Motorroll", 0, false,
                List.of("https://picsum.photos/seed/mrh2500a/800/600", "https://picsum.photos/seed/mrh2500b/800/600"));
        asignarFicha(hidraulico1, 2500, 0, "Acople directo al motor", 0, new BigDecimal("3400.00"),
                "Sala con circuito de agua de refrigeracion y desagote");

        Producto mixto1 = crearProducto(motorroll, mixto,
                "Banco mixto MR-MX3000 para linea de produccion",
                "Combina freno y volantes inerciales para simular al mismo tiempo la resistencia aerodinamica "
                        + "y el peso del vehiculo. Pensado para control de calidad de fin de linea.",
                new BigDecimal("245000.00"), 0, "Motorroll", 0, false,
                List.of("https://picsum.photos/seed/mrmx3000a/800/600"));
        asignarFicha(mixto1, 3000, 300, "Integral 4x4", 500, new BigDecimal("5200.00"),
                "Sala climatizada de 8 x 5 m con foso y sistema de amarre");

        Producto motos1 = crearProducto(dynotech, motos,
                "Banco de potencia para motos DT-M500",
                "Rampa y banco de rodillos para motos y cuatriciclos, con sistema de sujecion frontal "
                        + "y correccion de mediciones por condiciones atmosfericas.",
                new BigDecimal("27400.00"), 4, "DynoTech", 15, false,
                List.of("https://picsum.photos/seed/dtm500a/800/600"));
        asignarFicha(motos1, 500, 300, "Monotraccion", 300, new BigDecimal("780.00"),
                "Espacio de 4 x 2 m, no requiere foso");

        crearProducto(motorroll, software,
                "Licencia software de ensayo DynoWin Pro",
                "Genera las curvas de potencia y torque, compara corridas, aplica correccion atmosferica "
                        + "y exporta informes en PDF. Licencia anual por puesto.",
                new BigDecimal("1850.00"), 25, "Motorroll", 0, false,
                List.of("https://picsum.photos/seed/dynowin/800/600"));

        crearProducto(motorroll, sensores,
                "Sonda Lambda de banda ancha con modulo de adquisicion",
                "Medicion del factor Lambda y de la relacion aire/combustible en tiempo real, "
                        + "con salida analogica hacia el software de ensayo.",
                new BigDecimal("690.00"), 18, "Motorroll", 5, false,
                List.of("https://picsum.photos/seed/lambda/800/600"));

        crearProducto(dynotech, sensores,
                "Estacion de condiciones atmosfericas DT-ATM",
                "Mide presion, humedad y temperatura ambiente para corregir las mediciones "
                        + "segun las normas de ensayo.",
                new BigDecimal("1120.00"), 9, "DynoTech", 0, false,
                List.of("https://picsum.photos/seed/atm/800/600"));

        crearProducto(motorroll, sala,
                "Ventilador axial de sala de ensayo 24 pulgadas",
                "Ventilacion forzada para simular la marcha del vehiculo y refrigerar el radiador "
                        + "durante las corridas sostenidas.",
                new BigDecimal("2450.00"), 6, "Motorroll", 0, false,
                List.of("https://picsum.photos/seed/ventilador/800/600"));

        crearProducto(motorroll, repuestos,
                "Kit de rodamientos y correas para banco inercial",
                "Repuestos originales de mantenimiento preventivo: rodamientos, correas y tensores "
                        + "para bancos inerciales de la linea MR.",
                new BigDecimal("430.00"), 30, "Motorroll", 0, false,
                List.of("https://picsum.photos/seed/rodamientos/800/600"));

        crearProducto(motorroll, servicios,
                "Calibracion y certificacion con trazabilidad INTI",
                "Servicio de calibracion del dinamometro con pesas patron y emision del certificado "
                        + "con trazabilidad INTI. El stock representa los cupos disponibles del mes.",
                new BigDecimal("3200.00"), 8, "Motorroll", 0, true,
                List.of("https://picsum.photos/seed/calibracion/800/600"));

        crearProducto(motorroll, servicios,
                "Instalacion, puesta en marcha y capacitacion",
                "Instalacion con planos de ingenieria aprobados, puesta en marcha del equipo y "
                        + "capacitacion del personal del taller. El envio de la maquinaria se gestiona aparte.",
                new BigDecimal("5400.00"), 4, "Motorroll", 0, true,
                List.of("https://picsum.photos/seed/instalacion/800/600"));

        log.info("Datos de ejemplo cargados: {} usuarios, {} categorias, {} productos.",
                usuarioRepository.count(), categoriaRepository.count(), productoRepository.count());
        log.info("Usuario administrador: {} / admin1234", admin.getUsername());
    }

    // ------------------------------------------------------------------
    // Auxiliares
    // ------------------------------------------------------------------

    private Usuario crearUsuario(String username, String email, String password,
                                 String nombre, String apellido, Rol rol) {
        return usuarioRepository.save(Usuario.builder()
                .username(username)
                .email(email)
                .password(passwordEncoder.encode(password))
                .nombre(nombre)
                .apellido(apellido)
                .rol(rol)
                .activo(true)
                .build());
    }

    private Categoria crearCategoria(String nombre, String descripcion, Categoria padre) {
        return categoriaRepository.save(Categoria.builder()
                .nombre(nombre)
                .descripcion(descripcion)
                .categoriaPadre(padre)
                .build());
    }

    private Producto crearProducto(Usuario vendedor, Categoria categoria, String nombre, String descripcion,
                                   BigDecimal precio, int stock, String marca, int descuento,
                                   boolean esServicio, List<String> imagenes) {

        Producto producto = Producto.builder()
                .nombre(nombre)
                .descripcion(descripcion)
                .precio(precio)
                .stock(stock)
                .marca(marca)
                .descuento(descuento)
                .esServicio(esServicio)
                .activo(true)
                .categoria(categoria)
                .vendedor(vendedor)
                .build();

        int orden = 0;
        for (String url : imagenes) {
            producto.agregarImagen(ImagenProducto.builder().url(url).orden(orden).build());
            orden++;
        }

        return productoRepository.save(producto);
    }

    private void asignarFicha(Producto producto, Integer potenciaHp, Integer velocidadKmh, String traccion,
                              Integer diametroRodillo, BigDecimal pesoKg, String requerimientosSala) {

        producto.asignarFichaTecnica(FichaTecnica.builder()
                .potenciaMaximaHp(potenciaHp)
                .velocidadMaximaKmh(velocidadKmh)
                .tipoTraccion(traccion)
                .diametroRodilloMm(diametroRodillo)
                .pesoKg(pesoKg)
                .requerimientosSala(requerimientosSala)
                .build());

        productoRepository.save(producto);
    }
}
