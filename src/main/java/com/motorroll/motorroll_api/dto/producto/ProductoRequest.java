package com.motorroll.motorroll_api.dto.producto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/** Alta y edicion de una publicacion. La hace el usuario con rol VENDEDOR. */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductoRequest {

    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(max = 150, message = "El nombre no puede superar los 150 caracteres")
    private String nombre;

    @NotBlank(message = "La descripcion es obligatoria")
    @Size(max = 2000, message = "La descripcion no puede superar los 2000 caracteres")
    private String descripcion;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio tiene que ser mayor a cero")
    private BigDecimal precio;

    @NotNull(message = "El stock es obligatorio")
    @PositiveOrZero(message = "El stock no puede ser negativo")
    private Integer stock;

    @Size(max = 80, message = "La marca no puede superar los 80 caracteres")
    private String marca;

    @NotNull(message = "Tenes que indicar la categoria del producto")
    private Long categoriaId;

    @Min(value = 0, message = "El descuento no puede ser menor a 0")
    @Max(value = 100, message = "El descuento no puede ser mayor a 100")
    private Integer descuento;

    /** true si la publicacion es un servicio (calibracion, instalacion): el stock son cupos. */
    private Boolean esServicio;

    /** Una o mas fotos del producto, como pide el enunciado. */
    @Valid
    private List<ImagenRequest> imagenes;

    @Valid
    private FichaTecnicaRequest fichaTecnica;
}
