package com.motorroll.motorroll_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "productos")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(nullable = false, length = 2000)
    private String descripcion;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal precio;

    @Column(nullable = false)
    private Integer stock;

    @Column(length = 80)
    private String marca;

    @Builder.Default
    @Column(nullable = false)
    private Integer descuento = 0;

    @Builder.Default
    @Column(nullable = false)
    private boolean activo = true;

    @Builder.Default
    @Column(name = "es_servicio", nullable = false)
    private boolean esServicio = false;

    @Column(name = "fecha_alta", nullable = false)
    private LocalDateTime fechaAlta;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vendedor_id", nullable = false)
    private Usuario vendedor;

    @Builder.Default
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImagenProducto> imagenes = new ArrayList<>();

    @OneToOne(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private FichaTecnica fichaTecnica;

    @PrePersist
    public void alCrear() {
        if (fechaAlta == null) {
            fechaAlta = LocalDateTime.now();
        }
    }

    public BigDecimal calcularPrecioFinal() {
        if (descuento == null || descuento <= 0) {
            return precio.setScale(2, RoundingMode.HALF_UP);
        }
        BigDecimal porcentajeRestante = BigDecimal.valueOf(100 - descuento)
                .divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);
        return precio.multiply(porcentajeRestante).setScale(2, RoundingMode.HALF_UP);
    }

    public boolean hayStockPara(int cantidad) {
        return stock != null && stock >= cantidad;
    }

    public void agregarImagen(ImagenProducto imagen) {
        imagen.setProducto(this);
        this.imagenes.add(imagen);
    }

    public void asignarFichaTecnica(FichaTecnica ficha) {
        if (ficha != null) {
            ficha.setProducto(this);
        }
        this.fichaTecnica = ficha;
    }
}
