package com.motorroll.motorroll_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "notificaciones")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoNotificacion tipo;

    @Column(nullable = false, length = 80)
    private String titulo;

    @Column(nullable = false, length = 300)
    private String mensaje;

    @Column(length = 60)
    private String enlace;

    @Builder.Default
    @Column(nullable = false)
    private boolean leida = false;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @PrePersist
    public void alCrear() {
        if (fecha == null) {
            fecha = LocalDateTime.now();
        }
    }
}
