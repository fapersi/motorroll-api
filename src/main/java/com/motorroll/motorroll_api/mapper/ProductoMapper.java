package com.motorroll.motorroll_api.mapper;

import com.motorroll.motorroll_api.dto.producto.FichaTecnicaResponse;
import com.motorroll.motorroll_api.dto.producto.ImagenResponse;
import com.motorroll.motorroll_api.dto.producto.ProductoDetalleResponse;
import com.motorroll.motorroll_api.dto.producto.ProductoResumenResponse;
import com.motorroll.motorroll_api.model.FichaTecnica;
import com.motorroll.motorroll_api.model.ImagenProducto;
import com.motorroll.motorroll_api.model.Producto;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class ProductoMapper {

    private static final Comparator<ImagenProducto> POR_ORDEN =
            Comparator.comparing(ImagenProducto::getOrden, Comparator.nullsLast(Comparator.naturalOrder()));

    /** Version corta, la que se usa en la grilla del catalogo. */
    public ProductoResumenResponse aResumen(Producto producto) {
        return ProductoResumenResponse.builder()
                .id(producto.getId())
                .nombre(producto.getNombre())
                .marca(producto.getMarca())
                .precio(producto.getPrecio())
                .precioFinal(producto.calcularPrecioFinal())
                .descuento(producto.getDescuento())
                .stock(producto.getStock())
                .hayStock(producto.hayStockPara(1))
                .esServicio(producto.isEsServicio())
                .imagenPortada(buscarPortada(producto))
                .categoriaId(producto.getCategoria() != null ? producto.getCategoria().getId() : null)
                .categoriaNombre(producto.getCategoria() != null ? producto.getCategoria().getNombre() : null)
                .vendedor(producto.getVendedor() != null ? producto.getVendedor().getUsername() : null)
                .build();
    }

    public List<ProductoResumenResponse> aResumen(List<Producto> productos) {
        return productos.stream().map(this::aResumen).toList();
    }

    /** Version completa, la que se usa en la pantalla de detalle del producto. */
    public ProductoDetalleResponse aDetalle(Producto producto) {
        return ProductoDetalleResponse.builder()
                .id(producto.getId())
                .nombre(producto.getNombre())
                .descripcion(producto.getDescripcion())
                .marca(producto.getMarca())
                .precio(producto.getPrecio())
                .precioFinal(producto.calcularPrecioFinal())
                .descuento(producto.getDescuento())
                .stock(producto.getStock())
                .hayStock(producto.hayStockPara(1))
                .esServicio(producto.isEsServicio())
                .activo(producto.isActivo())
                .fechaAlta(producto.getFechaAlta())
                .categoriaId(producto.getCategoria() != null ? producto.getCategoria().getId() : null)
                .categoriaNombre(producto.getCategoria() != null ? producto.getCategoria().getNombre() : null)
                .vendedorId(producto.getVendedor() != null ? producto.getVendedor().getId() : null)
                .vendedor(producto.getVendedor() != null ? producto.getVendedor().getUsername() : null)
                .imagenes(aImagenes(producto.getImagenes()))
                .fichaTecnica(aFichaTecnica(producto.getFichaTecnica()))
                .build();
    }

    public List<ImagenResponse> aImagenes(List<ImagenProducto> imagenes) {
        if (imagenes == null) {
            return List.of();
        }
        return imagenes.stream()
                .sorted(POR_ORDEN)
                .map(imagen -> ImagenResponse.builder()
                        .id(imagen.getId())
                        .url(imagen.getUrl())
                        .orden(imagen.getOrden())
                        .build())
                .toList();
    }

    public FichaTecnicaResponse aFichaTecnica(FichaTecnica ficha) {
        if (ficha == null) {
            return null;
        }
        return FichaTecnicaResponse.builder()
                .potenciaMaximaHp(ficha.getPotenciaMaximaHp())
                .velocidadMaximaKmh(ficha.getVelocidadMaximaKmh())
                .tipoTraccion(ficha.getTipoTraccion())
                .diametroRodilloMm(ficha.getDiametroRodilloMm())
                .pesoKg(ficha.getPesoKg())
                .requerimientosSala(ficha.getRequerimientosSala())
                .build();
    }

    /** Imagen de portada: la de menor orden. Devuelve null si la publicacion no tiene fotos. */
    public String buscarPortada(Producto producto) {
        if (producto.getImagenes() == null || producto.getImagenes().isEmpty()) {
            return null;
        }
        return producto.getImagenes().stream()
                .min(POR_ORDEN)
                .map(ImagenProducto::getUrl)
                .orElse(null);
    }
}
