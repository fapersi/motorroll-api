package com.motorroll.motorroll_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor // Hibernate necesita si o si un constructor vacio para construir los objetos
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    /** Se guarda hasheada con BCrypt, nunca en texto plano. */
    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 60)
    private String nombre;

    @Column(nullable = false, length = 60)
    private String apellido;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Rol rol;

    @Column(name = "fecha_alta", nullable = false)
    private LocalDateTime fechaAlta;

    @Builder.Default
    @Column(nullable = false)
    private boolean activo = true;

    /** Publicaciones que este usuario puso a la venta (solo aplica a VENDEDOR). */
    @Builder.Default
    @OneToMany(mappedBy = "vendedor")
    private List<Producto> productos = new ArrayList<>();

    /** Historial de compras del usuario. */
    @Builder.Default
    @OneToMany(mappedBy = "comprador")
    private List<Orden> ordenes = new ArrayList<>();

    @PrePersist
    public void alCrear() {
        if (fechaAlta == null) {
            fechaAlta = LocalDateTime.now();
        }
    }

    public String getNombreCompleto() {
        return nombre + " " + apellido;
    }
}
