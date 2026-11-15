package com.motorroll.motorroll_api.service;

public interface MailService {
    void enviar(String para, String asunto, String html);
}
