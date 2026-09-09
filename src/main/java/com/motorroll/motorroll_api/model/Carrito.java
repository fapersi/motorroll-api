package com.motorroll.motorroll_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carritos")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "comprador_id", nullable = false)
    private Usuario comprador;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoCarrito estado = EstadoCarrito.ABIERTO;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @Builder.Default
    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemCarrito> items = new ArrayList<>();

    @PrePersist
    public void alCrear() {
        if (fechaCreacion == null) {
            fechaCreacion = LocalDateTime.now();
        }
    }

    public void agregarItem(ItemCarrito item) {
        item.setCarrito(this);
        this.items.add(item);
    }

    public BigDecimal calcularTotal() {
        return items.stream()
                .map(ItemCarrito::calcularSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
