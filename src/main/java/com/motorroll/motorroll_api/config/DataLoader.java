package com.motorroll.motorroll_api.config;

import com.motorroll.motorroll_api.model.AgendaDeTurnos;
import com.motorroll.motorroll_api.model.Categoria;
import com.motorroll.motorroll_api.model.FichaTecnica;
import com.motorroll.motorroll_api.model.ImagenProducto;
import com.motorroll.motorroll_api.model.Producto;
import com.motorroll.motorroll_api.model.Resena;
import com.motorroll.motorroll_api.model.Rol;
import com.motorroll.motorroll_api.model.Tienda;
import com.motorroll.motorroll_api.model.TipoVehiculo;
import com.motorroll.motorroll_api.model.Turno;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.CategoriaRepository;
import com.motorroll.motorroll_api.repository.ProductoRepository;
import com.motorroll.motorroll_api.repository.ResenaRepository;
import com.motorroll.motorroll_api.repository.TiendaRepository;
import com.motorroll.motorroll_api.repository.TurnoRepository;
import com.motorroll.motorroll_api.repository.UsuarioRepository;
import com.motorroll.motorroll_api.service.NotificacionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "motorroll.datos-iniciales", havingValue = "true")
public class DataLoader implements CommandLineRunner {
    private static final String CARPETA_DE_IMAGENES = "imagenes-demo/";

    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;
    private final ResenaRepository resenaRepository;
    private final TiendaRepository tiendaRepository;
    private final TurnoRepository turnoRepository;
    private final NotificacionService notificacionService;
    private final PasswordEncoder passwordEncoder;

    @Value("${motorroll.demo.clave-admin}")
    private String claveAdmin;

    @Value("${motorroll.demo.clave-vendedor}")
    private String claveVendedor;

    @Value("${motorroll.demo.clave-comprador}")
    private String claveComprador;

    @Override
    @Transactional
    public void run(String... args) {
        if (usuarioRepository.count() > 0) {
            log.info("La base ya tiene datos, no se cargan los datos de ejemplo.");
            return;
        }

        log.info("Cargando datos de ejemplo de Motorroll...");

        crearUsuario("admin", "admin@motorroll.com", claveAdmin,
                "Gisele", "Cuello", Rol.ADMIN);

        Usuario motorroll = crearUsuario("motorroll", "ventas@motorroll.com", claveVendedor,
                "Motorroll", "Power Test", Rol.VENDEDOR);

        Usuario dynotech = crearUsuario("dynotech", "info@dynotech.com.ar", claveVendedor,
                "Dyno", "Tech", Rol.VENDEDOR);

        Usuario taller = crearUsuario("taller.vtv", "compras@vtvcentro.com.ar", claveComprador,
                "Martín", "Álvarez", Rol.COMPRADOR);

        Usuario tuning = crearUsuario("tuning.rp", "info@rpperformance.com.ar", claveComprador,
                "Rocío", "Paz", Rol.COMPRADOR);

        Categoria bancos = crearCategoria("Bancos de potencia",
                "Dinamómetros de rodillos y de motor para medir potencia y torque", null);

        Categoria inercial = crearCategoria("Inercial",
                "Genera resistencia con volantes o rodillos de gran masa. El más simple y económico", bancos);

        Categoria hidraulico = crearCategoria("Hidráulico",
                "Freno dinamométrico que absorbe la potencia y permite ensayos sostenidos", bancos);

        Categoria mixto = crearCategoria("Mixto",
                "Combina freno y volantes inerciales: simula aerodinámica y peso del vehículo", bancos);

        Categoria motos = crearCategoria("Bancos de motos y vehículos especiales",
                "Rampas y bancos para motos, cuatriciclos y furgones", bancos);

        Categoria software = crearCategoria("Software y electrónica",
                "Software de ensayo, curvas de potencia y módulos de adquisición de datos", null);

        Categoria sensores = crearCategoria("Sensores y equipos auxiliares",
                "Sondas Lambda, celdas de carga, sensores de RPM y estaciones atmosféricas", null);

        Categoria sala = crearCategoria("Equipamiento de sala",
                "Ventilación, aislación acústica y sistemas de amarre del vehículo", null);

        Categoria repuestos = crearCategoria("Repuestos y consumibles",
                "Rodillos, rodamientos, correas, kits de calibración y cableados", null);

        Categoria servicios = crearCategoria("Servicios",
                "Calibración con trazabilidad INTI, instalación, puesta en marcha y capacitación", null);

        Producto inercial1 = crearProducto(motorroll, inercial,
                "Banco de potencia inercial MR-1200",
                "Dinamómetro de rodillos inercial para autos de tracción simple. Volante inercial calibrado, "
                        + "adquisición de RPM por pinza inductiva y generación automática de curvas de potencia y torque.",
                new BigDecimal("48500.00"), 3, "Motorroll", 0, false,
                List.of("mr1200-a.jpg", "mr1200-b.jpg"));
        asignarFicha(inercial1, 1200, 260, "Simple", 400, new BigDecimal("1850.00"),
                "Foso de 4.5 x 2.2 m, piso de hormigón armado y toma trifásica");

        Producto inercial2 = crearProducto(dynotech, inercial,
                "Banco inercial compacto DT-800 para tuning",
                "Pensado para talleres de preparación: mide la ganancia real de cada modificación y permite "
                        + "comparar corridas antes y después del remapeo de ECU.",
                new BigDecimal("32900.00"), 5, "DynoTech", 10, false,
                List.of("dt800-a.jpg"));
        asignarFicha(inercial2, 800, 220, "Simple", 350, new BigDecimal("1200.00"),
                "Sala de 5 x 3 m con extracción de gases");

        Producto hidraulico1 = crearProducto(motorroll, hidraulico,
                "Banco hidráulico de motor MR-H2500",
                "Freno dinamométrico hidráulico para ensayos de larga duración y homologación. "
                        + "El par motor se absorbe y se transforma en calor transferido al agua.",
                new BigDecimal("128000.00"), 1, "Motorroll", 0, false,
                List.of("mrh2500-a.jpg", "mrh2500-b.jpg"));
        asignarFicha(hidraulico1, 2500, 0, "Acople directo al motor", 0, new BigDecimal("3400.00"),
                "Sala con circuito de agua de refrigeración y desagote");

        Producto mixto1 = crearProducto(motorroll, mixto,
                "Banco mixto MR-MX3000 para línea de producción",
                "Combina freno y volantes inerciales para simular al mismo tiempo la resistencia aerodinámica "
                        + "y el peso del vehículo. Pensado para control de calidad de fin de línea.",
                new BigDecimal("245000.00"), 0, "Motorroll", 0, false,
                List.of("mrmx3000-a.jpg"));
        asignarFicha(mixto1, 3000, 300, "Integral 4x4", 500, new BigDecimal("5200.00"),
                "Sala climatizada de 8 x 5 m con foso y sistema de amarre");

        Producto motos1 = crearProducto(dynotech, motos,
                "Banco de potencia para motos DT-M500",
                "Rampa y banco de rodillos para motos y cuatriciclos, con sistema de sujeción frontal "
                        + "y corrección de mediciones por condiciones atmosféricas.",
                new BigDecimal("27400.00"), 4, "DynoTech", 15, false,
                List.of("dtm500-a.jpg"));
        asignarFicha(motos1, 500, 300, "Monotracción", 300, new BigDecimal("780.00"),
                "Espacio de 4 x 2 m, no requiere foso");

        crearProducto(motorroll, software,
                "Licencia software de ensayo DynoWin Pro",
                "Genera las curvas de potencia y torque, compara corridas, aplica corrección atmosférica "
                        + "y exporta informes en PDF. Licencia anual por puesto.",
                new BigDecimal("1850.00"), 25, "Motorroll", 0, false,
                List.of("dynowin-a.jpg"));

        crearProducto(motorroll, sensores,
                "Sonda Lambda de banda ancha con módulo de adquisición",
                "Medición del factor Lambda y de la relación aire/combustible en tiempo real, "
                        + "con salida analógica hacia el software de ensayo.",
                new BigDecimal("690.00"), 18, "Motorroll", 5, false,
                List.of("lambda-a.jpg"));

        crearProducto(dynotech, sensores,
                "Estación de condiciones atmosféricas DT-ATM",
                "Mide presión, humedad y temperatura ambiente para corregir las mediciones "
                        + "según las normas de ensayo.",
                new BigDecimal("1120.00"), 9, "DynoTech", 0, false,
                List.of("atm-a.jpg"));

        crearProducto(motorroll, sala,
                "Ventilador axial de sala de ensayo 24 pulgadas",
                "Ventilación forzada para simular la marcha del vehículo y refrigerar el radiador "
                        + "durante las corridas sostenidas.",
                new BigDecimal("2450.00"), 6, "Motorroll", 0, false,
                List.of("ventilador-a.jpg"));

        crearProducto(motorroll, repuestos,
                "Kit de rodamientos y correas para banco inercial",
                "Repuestos originales de mantenimiento preventivo: rodamientos, correas y tensores "
                        + "para bancos inerciales de la línea MR.",
                new BigDecimal("430.00"), 30, "Motorroll", 0, false,
                List.of("rodamientos-a.jpg"));

        crearProducto(motorroll, servicios,
                "Calibración y certificación con trazabilidad INTI",
                "Servicio de calibración del dinamómetro con pesas patrón y emisión del certificado "
                        + "con trazabilidad INTI. El stock representa los cupos disponibles del mes.",
                new BigDecimal("3200.00"), 8, "Motorroll", 0, true,
                List.of("calibracion-a.jpg"));

        crearProducto(motorroll, servicios,
                "Instalación, puesta en marcha y capacitación",
                "Instalación con planos de ingeniería aprobados, puesta en marcha del equipo y "
                        + "capacitación del personal del taller. El envío de la maquinaria se gestiona aparte.",
                new BigDecimal("5400.00"), 4, "Motorroll", 0, true,
                List.of("instalacion-a.jpg"));

        taller.setPuntos(650);
        usuarioRepository.save(taller);

        crearResena(inercial1, taller, 5,
                "Lo usamos todos los días en la VTV. Las curvas salen al toque y la calibración se mantiene.");
        crearResena(inercial1, tuning, 4,
                "Muy buen banco para el precio. El software podría ser más intuitivo, pero mide bien.");
        crearResena(inercial2, tuning, 5,
                "Ideal para tuning: comparo antes y después del remapeo en dos minutos.");
        crearResena(motos1, taller, 4,
                "Probamos motos y cuatriciclos sin problema. La sujeción frontal es firme.");
        crearResena(mixto1, tuning, 3,
                "Es una bestia, pero necesitás una sala grande y bien climatizada.");

        crearTienda(motorroll, "Motorroll Power Test", "Bancos de potencia hechos en Argentina",
                "#eb333b", "#ffb21f", "logo-motorroll.jpg");
        crearTienda(dynotech, "DynoTech", "Equipos de medición para talleres de tuning",
                "#1f6fd1", "#22c1c9", null);

        crearTurno(taller, inercial1, "Volkswagen Gol Trend");

        log.info("Datos de ejemplo cargados: {} usuarios, {} categorías, {} productos.",
                usuarioRepository.count(), categoriaRepository.count(), productoRepository.count());
    }

    private void crearTurno(Usuario cliente, Producto banco, String modelo) {
        LocalDate fecha = LocalDate.now().plusDays(2);
        while (!AgendaDeTurnos.esDiaHabil(fecha)) {
            fecha = fecha.plusDays(1);
        }

        Turno turno = turnoRepository.save(Turno.builder()
                .cliente(cliente)
                .banco(banco)
                .fecha(fecha)
                .hora("10:30")
                .vehiculo(TipoVehiculo.AUTO)
                .modeloVehiculo(modelo)
                .comentario("Quiero comparar la potencia antes y después del remapeo")
                .cotizarVtv(true)
                .build());
        notificacionService.avisarTurnoReservado(turno);
    }

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

    private void crearTienda(Usuario vendedor, String nombre, String eslogan,
                             String colorPrincipal, String colorSecundario, String archivoDeLogo) {
        Tienda tienda = Tienda.builder()
                .vendedor(vendedor)
                .nombre(nombre)
                .eslogan(eslogan)
                .colorPrincipal(colorPrincipal)
                .colorSecundario(colorSecundario)
                .build();

        ClassPathResource recurso = archivoDeLogo == null ? null
                : new ClassPathResource(CARPETA_DE_IMAGENES + archivoDeLogo);
        if (recurso != null && recurso.exists()) {
            try (InputStream entrada = recurso.getInputStream()) {
                tienda.cambiarLogo(entrada.readAllBytes(), MediaType.IMAGE_JPEG_VALUE);
            } catch (IOException e) {
                throw new IllegalStateException("No se pudo leer la imagen " + archivoDeLogo, e);
            }
        }

        tiendaRepository.save(tienda);
    }

    private void crearResena(Producto producto, Usuario autor, int estrellas, String comentario) {
        resenaRepository.save(Resena.builder()
                .producto(producto)
                .autor(autor)
                .estrellas(estrellas)
                .comentario(comentario)
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
                                   boolean esServicio, List<String> archivosDeImagen) {
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
        for (String archivo : archivosDeImagen) {
            producto.agregarImagen(cargarImagen(archivo, orden));
            orden++;
        }

        return productoRepository.save(producto);
    }

    private ImagenProducto cargarImagen(String nombreArchivo, int orden) {
        ClassPathResource recurso = new ClassPathResource(CARPETA_DE_IMAGENES + nombreArchivo);

        if (!recurso.exists()) {
            log.warn("No se encontró la imagen {}, se usa una de placeholder", nombreArchivo);
            return ImagenProducto.builder()
                    .url("https://picsum.photos/seed/" + nombreArchivo.replace(".jpg", "") + "/800/600")
                    .orden(orden)
                    .build();
        }

        try (InputStream entrada = recurso.getInputStream()) {
            return ImagenProducto.builder()
                    .datos(entrada.readAllBytes())
                    .contentType(MediaType.IMAGE_JPEG_VALUE)
                    .nombreArchivo(nombreArchivo)
                    .orden(orden)
                    .build();
        } catch (IOException e) {
            throw new IllegalStateException("No se pudo leer la imagen " + nombreArchivo, e);
        }
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
