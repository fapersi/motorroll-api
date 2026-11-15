package com.motorroll.motorroll_api.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.HtmlUtils;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PlantillaDeMail {

    @Value("${motorroll.front-url}")
    private String urlDelFront;

    public String armar(String nombre, String titulo, String mensaje, String enlace, List<String> queTraer) {
        String lista = queTraer.isEmpty() ? "" : "<p style=\"margin:20px 0 6px;font-weight:bold;color:#ffffff\">Qué traer</p>"
                + "<ul style=\"margin:0;padding-left:20px\">"
                + queTraer.stream()
                        .map(item -> "<li style=\"margin:4px 0\">" + HtmlUtils.htmlEscape(item) + "</li>")
                        .collect(Collectors.joining())
                + "</ul>";
        String destino = urlDelFront + (enlace == null ? "" : enlace);

        return """
                <div style="background:#0f1014;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
                  <div style="max-width:520px;margin:0 auto;background:#1a1c22;border:1px solid #2a2d35;border-radius:12px;overflow:hidden">
                    <div style="background:#eb333b;padding:16px 24px;color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:2px">MOTORROLL</div>
                    <div style="padding:24px;color:#e8e9ec;font-size:15px;line-height:1.5">
                      <p style="margin:0 0 6px;color:#b6bac4">Hola %s,</p>
                      <h1 style="margin:0 0 12px;font-size:22px;color:#ffffff">%s</h1>
                      <p style="margin:0">%s</p>
                      %s
                      <a href="%s" style="display:inline-block;margin-top:24px;background:#eb333b;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:bold">Ver en Motorroll</a>
                    </div>
                    <div style="padding:12px 24px;border-top:1px solid #2a2d35;color:#7d818c;font-size:12px">Te escribimos porque tenés una cuenta en Motorroll.</div>
                  </div>
                </div>
                """.formatted(HtmlUtils.htmlEscape(nombre), HtmlUtils.htmlEscape(titulo),
                HtmlUtils.htmlEscape(mensaje), lista, HtmlUtils.htmlEscape(destino));
    }
}
