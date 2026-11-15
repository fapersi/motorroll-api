package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.service.MailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final JavaMailSender mailSender;

    @Value("${motorroll.mail.habilitado}")
    private boolean habilitado;

    @Value("${motorroll.mail.desvio}")
    private String desvio;

    @Value("${spring.mail.username}")
    private String remitente;

    @Async
    @Override
    public void enviar(String para, String asunto, String html) {
        if (!habilitado || desvio.isBlank()) {
            log.info("Mail no enviado (modo demo sin casilla configurada): {}", asunto);
            return;
        }

        String destino = desvio;
        String asuntoFinal = "[para " + para + "] " + asunto;

        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper ayudante = new MimeMessageHelper(mensaje, "UTF-8");
            ayudante.setFrom(remitente, "Motorroll");
            ayudante.setTo(destino);
            ayudante.setSubject(asuntoFinal);
            ayudante.setText(html, true);
            mailSender.send(mensaje);
            log.info("Mail enviado: {}", asuntoFinal);
        } catch (Exception e) {
            log.warn("No se pudo enviar el mail ({}): {}", asunto, e.getMessage());
        }
    }
}
