package com.motorroll.motorroll_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "imagenes_producto")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImagenProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500)
    private String url;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "datos")
    private byte[] datos;

    @Column(name = "content_type", length = 100)
    private String contentType;

    @Column(name = "nombre_archivo", length = 255)
    private String nombreArchivo;

    @Builder.Default
    @Column(nullable = false)
    private Integer orden = 0;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    public boolean esArchivoSubido() {
        return datos != null && datos.length > 0;
    }
}
