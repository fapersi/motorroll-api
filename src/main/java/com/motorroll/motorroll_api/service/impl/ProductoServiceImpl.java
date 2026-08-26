package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.dto.producto.FichaTecnicaRequest;
import com.motorroll.motorroll_api.dto.producto.ImagenRequest;
import com.motorroll.motorroll_api.dto.producto.ProductoDetalleResponse;
import com.motorroll.motorroll_api.dto.producto.ProductoRequest;
import com.motorroll.motorroll_api.dto.producto.ProductoResumenResponse;
import com.motorroll.motorroll_api.exception.OperacionNoPermitidaException;
import com.motorroll.motorroll_api.exception.RecursoNoEncontradoException;
import com.motorroll.motorroll_api.mapper.ProductoMapper;
import com.motorroll.motorroll_api.model.Categoria;
import com.motorroll.motorroll_api.model.FichaTecnica;
import com.motorroll.motorroll_api.model.ImagenProducto;
import com.motorroll.motorroll_api.model.Producto;
import com.motorroll.motorroll_api.model.Rol;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.CategoriaRepository;
import com.motorroll.motorroll_api.repository.ProductoRepository;
import com.motorroll.motorroll_api.service.ProductoService;
import com.motorroll.motorroll_api.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;
    private final UsuarioService usuarioService;
    private final ProductoMapper productoMapper;

    // ------------------------------------------------------------------
    // Catalogo publico
    // ------------------------------------------------------------------

    @Override
    @Transactional(readOnly = true)
    public List<ProductoResumenResponse> buscar(String texto, Long categoriaId, String marca,
                                                BigDecimal precioMin, BigDecimal precioMax,
                                                boolean soloConStock, String ordenarPor) {

        List<Producto> productos = productoRepository.buscarConFiltros(
                normalizar(texto), categoriaId, normalizar(marca),
                precioMin, precioMax, soloConStock, armarOrden(ordenarPor));

        return productoMapper.aResumen(productos);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductoDetalleResponse obtenerDetalle(Long id) {
        Producto producto = productoRepository.findByIdAndActivoTrue(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("el producto", id));

        return productoMapper.aDetalle(producto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> listarMarcas() {
        return productoRepository.listarMarcas();
    }

    // ------------------------------------------------------------------
    // Gestion de publicaciones (vendedor)
    // ------------------------------------------------------------------

    @Override
    @Transactional(readOnly = true)
    public List<ProductoDetalleResponse> misPublicaciones(String username) {
        Usuario vendedor = usuarioService.buscarEntidadPorUsername(username);

        return productoRepository.findByVendedorIdOrderByFechaAltaDesc(vendedor.getId()).stream()
                .map(productoMapper::aDetalle)
                .toList();
    }

    @Override
    @Transactional
    public ProductoDetalleResponse crear(String username, ProductoRequest request) {
        Usuario vendedor = usuarioService.buscarEntidadPorUsername(username);
        validarQuePuedaPublicar(vendedor);

        Categoria categoria = buscarCategoria(request.getCategoriaId());

        Producto producto = Producto.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .precio(request.getPrecio())
                .stock(request.getStock())
                .marca(request.getMarca())
                .descuento(request.getDescuento() != null ? request.getDescuento() : 0)
                .esServicio(Boolean.TRUE.equals(request.getEsServicio()))
                .activo(true)
                .categoria(categoria)
                .vendedor(vendedor)
                .build();

        reemplazarImagenes(producto, request.getImagenes());
        producto.asignarFichaTecnica(armarFicha(request.getFichaTecnica()));

        return productoMapper.aDetalle(productoRepository.save(producto));
    }

    @Override
    @Transactional
    public ProductoDetalleResponse actualizar(String username, Long id, ProductoRequest request) {
        Producto producto = buscarPropio(username, id);

        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setStock(request.getStock());
        producto.setMarca(request.getMarca());
        producto.setCategoria(buscarCategoria(request.getCategoriaId()));

        if (request.getDescuento() != null) {
            producto.setDescuento(request.getDescuento());
        }
        if (request.getEsServicio() != null) {
            producto.setEsServicio(request.getEsServicio());
        }
        if (request.getImagenes() != null) {
            reemplazarImagenes(producto, request.getImagenes());
        }
        if (request.getFichaTecnica() != null) {
            actualizarFicha(producto, request.getFichaTecnica());
        }

        return productoMapper.aDetalle(productoRepository.save(producto));
    }

    @Override
    @Transactional
    public ProductoDetalleResponse actualizarStock(String username, Long id, Integer stock) {
        Producto producto = buscarPropio(username, id);
        producto.setStock(stock);

        return productoMapper.aDetalle(productoRepository.save(producto));
    }

    @Override
    @Transactional
    public ProductoDetalleResponse actualizarDescuento(String username, Long id, Integer descuento) {
        Producto producto = buscarPropio(username, id);
        producto.setDescuento(descuento);

        return productoMapper.aDetalle(productoRepository.save(producto));
    }

    @Override
    @Transactional
    public void eliminar(String username, Long id) {
        Producto producto = buscarPropio(username, id);

        // Baja logica: la publicacion sale del catalogo pero las ordenes viejas la siguen referenciando.
        producto.setActivo(false);
        productoRepository.save(producto);
    }

    // ------------------------------------------------------------------
    // Auxiliares
    // ------------------------------------------------------------------

    /** El vendedor solo puede tocar sus propias publicaciones; el admin puede moderar cualquiera. */
    private Producto buscarPropio(String username, Long id) {
        Usuario usuario = usuarioService.buscarEntidadPorUsername(username);

        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("el producto", id));

        boolean esElDuenio = producto.getVendedor().getId().equals(usuario.getId());
        if (!esElDuenio && usuario.getRol() != Rol.ADMIN) {
            throw new OperacionNoPermitidaException("Solo el vendedor que publico el producto puede modificarlo");
        }

        return producto;
    }

    private void validarQuePuedaPublicar(Usuario usuario) {
        if (usuario.getRol() != Rol.VENDEDOR && usuario.getRol() != Rol.ADMIN) {
            throw new OperacionNoPermitidaException("Necesitas una cuenta de VENDEDOR para publicar productos");
        }
    }

    private Categoria buscarCategoria(Long categoriaId) {
        return categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RecursoNoEncontradoException("la categoria", categoriaId));
    }

    private void reemplazarImagenes(Producto producto, List<ImagenRequest> imagenes) {
        producto.getImagenes().clear();

        if (imagenes == null) {
            return;
        }

        int posicion = 0;
        for (ImagenRequest imagen : imagenes) {
            producto.agregarImagen(ImagenProducto.builder()
                    .url(imagen.getUrl())
                    .orden(imagen.getOrden() != null ? imagen.getOrden() : posicion)
                    .build());
            posicion++;
        }
    }

    private FichaTecnica armarFicha(FichaTecnicaRequest request) {
        if (request == null) {
            return null;
        }
        return FichaTecnica.builder()
                .potenciaMaximaHp(request.getPotenciaMaximaHp())
                .velocidadMaximaKmh(request.getVelocidadMaximaKmh())
                .tipoTraccion(request.getTipoTraccion())
                .diametroRodilloMm(request.getDiametroRodilloMm())
                .pesoKg(request.getPesoKg())
                .requerimientosSala(request.getRequerimientosSala())
                .build();
    }

    private void actualizarFicha(Producto producto, FichaTecnicaRequest request) {
        FichaTecnica ficha = producto.getFichaTecnica();

        if (ficha == null) {
            producto.asignarFichaTecnica(armarFicha(request));
            return;
        }

        ficha.setPotenciaMaximaHp(request.getPotenciaMaximaHp());
        ficha.setVelocidadMaximaKmh(request.getVelocidadMaximaKmh());
        ficha.setTipoTraccion(request.getTipoTraccion());
        ficha.setDiametroRodilloMm(request.getDiametroRodilloMm());
        ficha.setPesoKg(request.getPesoKg());
        ficha.setRequerimientosSala(request.getRequerimientosSala());
    }

    /** Convierte el parametro ordenarPor de la URL en un Sort de Spring Data. */
    private Sort armarOrden(String ordenarPor) {
        if (ordenarPor == null || ordenarPor.isBlank()) {
            return Sort.by(Sort.Direction.DESC, "fechaAlta");
        }

        return switch (ordenarPor.toLowerCase()) {
            case "precio_asc" -> Sort.by(Sort.Direction.ASC, "precio");
            case "precio_desc" -> Sort.by(Sort.Direction.DESC, "precio");
            case "nombre" -> Sort.by(Sort.Direction.ASC, "nombre");
            default -> Sort.by(Sort.Direction.DESC, "fechaAlta");
        };
    }

    /** Los filtros de texto vacios se tratan como sin filtro. */
    private String normalizar(String valor) {
        return (valor == null || valor.isBlank()) ? null : valor.trim();
    }
}
