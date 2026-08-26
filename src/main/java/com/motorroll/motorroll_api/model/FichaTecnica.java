package com.motorroll.motorroll_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Atributos tecnicos propios del rubro (dinamometros y equipamiento de testeo).
 * Es opcional: un repuesto o un servicio puede no tener ficha.
 */
@Entity
@Table(name = "fichas_tecnicas")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FichaTecnica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "potencia_maxima_hp")
    private Integer potenciaMaximaHp;

    @Column(name = "velocidad_maxima_kmh")
    private Integer velocidadMaximaKmh;

    /** Simple, doble o integral. */
    @Column(name = "tipo_traccion", length = 60)
    private String tipoTraccion;

    @Column(name = "diametro_rodillo_mm")
    private Integer diametroRodilloMm;

    @Column(name = "peso_kg", precision = 10, scale = 2)
    private BigDecimal pesoKg;

    @Column(name = "requerimientos_sala", length = 500)
    private String requerimientosSala;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "producto_id", nullable = false, unique = true)
    private Producto producto;
}
