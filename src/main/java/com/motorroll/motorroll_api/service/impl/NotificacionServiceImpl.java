package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.dto.notificacion.NotificacionResponse;
import com.motorroll.motorroll_api.exception.RecursoNoEncontradoException;
import com.motorroll.motorroll_api.mapper.NotificacionMapper;
import com.motorroll.motorroll_api.model.ItemOrden;
import com.motorroll.motorroll_api.model.Notificacion;
import com.motorroll.motorroll_api.model.Orden;
import com.motorroll.motorroll_api.model.TipoNotificacion;
import com.motorroll.motorroll_api.model.Turno;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.NotificacionRepository;
import com.motorroll.motorroll_api.service.MailService;
import com.motorroll.motorroll_api.service.NotificacionService;
import com.motorroll.motorroll_api.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificacionServiceImpl implements NotificacionService {
    private static final Locale ARGENTINA = Locale.forLanguageTag("es-AR");
    private static final DateTimeFormatter DIA = DateTimeFormatter.ofPattern("EEEE d/M", ARGENTINA);
    private static final List<String> QUE_TRAER = List.of(
            "Cédula verde del vehículo (física o digital)",
            "Seguro vigente",
            "Al menos medio tanque de combustible",
            "Neumáticos con la presión correcta");
    private static final Map<String, String> METODOS = Map.of(
            "TARJETA_CREDITO", "tarjeta de crédito", "TARJETA_DEBITO", "tarjeta de débito",
            "TRANSFERENCIA", "transferencia", "BILLETERA_VIRTUAL", "billetera virtual",
            "EFECTIVO", "efectivo");

    private final NotificacionRepository notificacionRepository;
    private final UsuarioService usuarioService;
    private final NotificacionMapper notificacionMapper;
    private final MailService mailService;
    private final PlantillaDeMail plantillaDeMail;

    @Override
    @Transactional(readOnly = true)
    public List<NotificacionResponse> misNotificaciones(String username) {
        Usuario usuario = usuarioService.buscarEntidadPorUsername(username);
        return notificacionMapper.aResponse(
                notificacionRepository.findTop30ByUsuarioIdOrderByFechaDescIdDesc(usuario.getId()));
    }

    @Override
    @Transactional
    public NotificacionResponse marcarLeida(String username, Long id) {
        Usuario usuario = usuarioService.buscarEntidadPorUsername(username);
        Notificacion notificacion = notificacionRepository.findByIdAndUsuarioId(id, usuario.getId())
                .orElseThrow(() -> new RecursoNoEncontradoException("la notificación", id));

        notificacion.setLeida(true);
        return notificacionMapper.aResponse(notificacionRepository.save(notificacion));
    }

    @Override
    @Transactional
    public List<NotificacionResponse> marcarTodasLeidas(String username) {
        Usuario usuario = usuarioService.buscarEntidadPorUsername(username);
        List<Notificacion> sinLeer = notificacionRepository.findByUsuarioIdAndLeidaFalse(usuario.getId());
        sinLeer.forEach(notificacion -> notificacion.setLeida(true));
        notificacionRepository.saveAll(sinLeer);

        return notificacionMapper.aResponse(
                notificacionRepository.findTop30ByUsuarioIdOrderByFechaDescIdDesc(usuario.getId()));
    }

    @Override
    @Transactional
    public NotificacionResponse avisarCompra(Orden orden) {
        Usuario comprador = orden.getComprador();
        Notificacion delComprador = avisar(comprador, TipoNotificacion.COMPRA, "Compra confirmada",
                "Tu orden #" + orden.getId() + " por US$ " + precio(orden.getTotal())
                        + " quedó confirmada. Sumaste " + orden.getPuntosGanados() + " puntos para tu próxima compra.",
                "/ordenes", List.of());

        Map<Long, List<ItemOrden>> porVendedor = orden.getItems().stream()
                .collect(Collectors.groupingBy(item -> item.getProducto().getVendedor().getId(),
                        LinkedHashMap::new, Collectors.toList()));

        porVendedor.values().forEach(items -> avisar(items.get(0).getProducto().getVendedor(),
                TipoNotificacion.VENTA, "Nueva venta",
                "Orden #" + orden.getId() + ": " + comprador.getNombreCompleto() + " compró " + items.stream()
                        .map(item -> item.getCantidad() + " × " + item.getNombreProducto()
                                + " (quedan " + item.getProducto().getStock() + ")")
                        .collect(Collectors.joining(", "))
                        + ". Pagó con " + METODOS.getOrDefault(String.valueOf(orden.getMetodoPago()), "otro medio")
                        + ". Envío a " + orden.getDireccionEnvio() + ".",
                "/vendedor", List.of()));
        return notificacionMapper.aResponse(delComprador);
    }

    @Override
    @Transactional
    public NotificacionResponse avisarTurnoReservado(Turno turno) {
        String banco = turno.getBanco().getNombre();
        String vtv = turno.isCotizarVtv()
                ? " Pediste que te coticemos la VTV: traé la cédula y el último certificado, aunque esté vencido."
                : " Traé la VTV vigente. Si no la tenés al día, avisanos y te la cotizamos en el taller.";
        String comentario = turno.getComentario() == null || turno.getComentario().isBlank()
                ? "" : " Comentario: " + turno.getComentario();

        Notificacion delCliente = avisar(turno.getCliente(), TipoNotificacion.TURNO, "Turno reservado",
                "Te esperamos el " + cuando(turno) + " para probar el " + banco + "." + vtv,
                "/turnos", QUE_TRAER);
        avisar(turno.getBanco().getVendedor(), TipoNotificacion.TURNO, "Nuevo turno de prueba",
                turno.getCliente().getNombreCompleto() + " va a probar el " + banco + " el " + cuando(turno)
                        + " con su " + turno.getModeloVehiculo() + "."
                        + (turno.isCotizarVtv() ? " Pide que le coticen la VTV." : "") + comentario,
                "/vendedor", List.of());
        return notificacionMapper.aResponse(delCliente);
    }

    @Override
    @Transactional
    public NotificacionResponse avisarTurnoCancelado(Turno turno) {
        String banco = turno.getBanco().getNombre();

        Notificacion delCliente = avisar(turno.getCliente(), TipoNotificacion.TURNO, "Turno cancelado",
                "Cancelaste el turno del " + cuando(turno) + " para probar el " + banco + ".",
                "/turnos", List.of());
        avisar(turno.getBanco().getVendedor(), TipoNotificacion.TURNO, "Turno cancelado",
                turno.getCliente().getNombreCompleto() + " canceló el turno del " + cuando(turno)
                        + " para probar el " + banco + ".",
                "/vendedor", List.of());
        return notificacionMapper.aResponse(delCliente);
    }

    private Notificacion avisar(Usuario usuario, TipoNotificacion tipo, String titulo, String mensaje,
                                String enlace, List<String> queTraer) {
        String texto = mensaje.length() > 300 ? mensaje.substring(0, 299) + "…" : mensaje;

        Notificacion guardada = notificacionRepository.save(Notificacion.builder()
                .usuario(usuario)
                .tipo(tipo)
                .titulo(titulo)
                .mensaje(texto)
                .enlace(enlace)
                .build());

        String para = usuario.getEmail();
        String asunto = titulo + " · Motorroll";
        String html = plantillaDeMail.armar(usuario.getNombre(), titulo, texto, enlace, queTraer);
        if (!TransactionSynchronizationManager.isSynchronizationActive()) {
            mailService.enviar(para, asunto, html);
            return guardada;
        }
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                mailService.enviar(para, asunto, html);
            }
        });
        return guardada;
    }

    private String cuando(Turno turno) {
        return turno.getFecha().format(DIA) + " a las " + turno.getHora();
    }

    private String precio(BigDecimal valor) {
        return String.format(ARGENTINA, "%,.2f", valor);
    }
}
