package com.motorroll.motorroll_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tiendas")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Tienda {
    public static final String COLOR_PRINCIPAL = "#eb333b";
    public static final String COLOR_SECUNDARIO = "#ffb21f";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vendedor_id", nullable = false, unique = true)
    private Usuario vendedor;

    @Column(nullable = false, length = 60)
    private String nombre;

    @Column(length = 120)
    private String eslogan;

    @Column(name = "color_principal", nullable = false, length = 7)
    private String colorPrincipal;

    @Column(name = "color_secundario", nullable = false, length = 7)
    private String colorSecundario;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type", length = 100)
    private String logoContentType;

    @Builder.Default
    @Column(name = "logo_version", nullable = false)
    private Integer logoVersion = 0;

    public static Tienda porDefecto(Usuario vendedor) {
        return Tienda.builder()
                .vendedor(vendedor)
                .nombre(vendedor.getNombreCompleto().length() > 60
                        ? vendedor.getNombreCompleto().substring(0, 60) : vendedor.getNombreCompleto())
                .colorPrincipal(COLOR_PRINCIPAL)
                .colorSecundario(COLOR_SECUNDARIO)
                .build();
    }

    public boolean tieneLogo() {
        return logo != null && logo.length > 0;
    }

    public void cambiarLogo(byte[] datos, String contentType) {
        this.logo = datos;
        this.logoContentType = contentType;
        this.logoVersion = logoVersion == null ? 1 : logoVersion + 1;
    }
}
