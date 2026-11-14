package com.motorroll.motorroll_api.controller;

import com.motorroll.motorroll_api.dto.turno.AgendaResponse;
import com.motorroll.motorroll_api.dto.turno.BancoParaProbarResponse;
import com.motorroll.motorroll_api.dto.turno.TurnoRequest;
import com.motorroll.motorroll_api.dto.turno.TurnoResponse;
import com.motorroll.motorroll_api.service.TurnoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/turnos")
@RequiredArgsConstructor
public class TurnoController {
    private final TurnoService turnoService;

    @GetMapping("/bancos")
    public ResponseEntity<List<BancoParaProbarResponse>> listarBancos() {
        return ResponseEntity.ok(turnoService.listarBancos());
    }

    @GetMapping("/agenda")
    public ResponseEntity<AgendaResponse> verAgenda() {
        return ResponseEntity.ok(turnoService.verAgenda());
    }

    @GetMapping("/mios")
    public ResponseEntity<List<TurnoResponse>> misTurnos(Authentication authentication) {
        return ResponseEntity.ok(turnoService.misTurnos(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<TurnoResponse> reservar(Authentication authentication,
                                                  @Valid @RequestBody TurnoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(turnoService.reservar(authentication.getName(), request));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<TurnoResponse> cancelar(Authentication authentication, @PathVariable Long id) {
        return ResponseEntity.ok(turnoService.cancelar(authentication.getName(), id));
    }
}
