package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.dto.producto.ArchivoImagen;
import com.motorroll.motorroll_api.dto.tienda.TiendaRequest;
import com.motorroll.motorroll_api.dto.tienda.TiendaResponse;
import com.motorroll.motorroll_api.exception.RecursoNoEncontradoException;
import com.motorroll.motorroll_api.exception.ReglaDeNegocioException;
import com.motorroll.motorroll_api.mapper.ProductoMapper;
import com.motorroll.motorroll_api.mapper.TiendaMapper;
import com.motorroll.motorroll_api.model.Producto;
import com.motorroll.motorroll_api.model.Rol;
import com.motorroll.motorroll_api.model.Tienda;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.ProductoRepository;
import com.motorroll.motorroll_api.repository.TiendaRepository;
import com.motorroll.motorroll_api.repository.UsuarioRepository;
import com.motorroll.motorroll_api.service.TiendaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TiendaServiceImpl implements TiendaService {
    private static final Set<String> TIPOS_PERMITIDOS =
            Set.of("image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif");

    private final TiendaRepository tiendaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;
    private final ProductoMapper productoMapper;
    private final TiendaMapper tiendaMapper;

    @Override
    @Transactional(readOnly = true)
    public List<TiendaResponse> listar() {
        return usuarioRepository.findByRolAndActivoTrueOrderByIdAsc(Rol.VENDEDOR).stream()
                .map(vendedor -> tiendaMapper.aResponse(tiendaDe(vendedor),
                        (int) productoRepository.countByVendedorIdAndActivoTrue(vendedor.getId()), null))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TiendaResponse obtener(String username) {
        Usuario vendedor = buscarVendedor(username);
        List<Producto> productos = productosActivos(vendedor);

        return tiendaMapper.aResponse(tiendaDe(vendedor), productos.size(), productoMapper.aResumen(productos));
    }

    @Override
    @Transactional(readOnly = true)
    public TiendaResponse miTienda(String username) {
        Usuario vendedor = buscarVendedor(username);

        return tiendaMapper.aResponse(tiendaDe(vendedor), (int) productoRepository.countByVendedorIdAndActivoTrue(vendedor.getId()), null);
    }

    @Override
    @Transactional
    public TiendaResponse actualizar(String username, TiendaRequest request) {
        Usuario vendedor = buscarVendedor(username);
        Tienda tienda = tiendaDe(vendedor);

        tienda.setNombre(request.getNombre().trim());
        tienda.setEslogan(request.getEslogan() == null || request.getEslogan().isBlank()
                ? null : request.getEslogan().trim());
        tienda.setColorPrincipal(request.getColorPrincipal().toLowerCase());
        tienda.setColorSecundario(request.getColorSecundario().toLowerCase());

        Tienda guardada = tiendaRepository.save(tienda);
        return tiendaMapper.aResponse(guardada, (int) productoRepository.countByVendedorIdAndActivoTrue(vendedor.getId()), null);
    }

    @Override
    @Transactional
    public TiendaResponse cambiarLogo(String username, MultipartFile archivo) {
        Usuario vendedor = buscarVendedor(username);
        validarArchivo(archivo);
        Tienda tienda = tiendaDe(vendedor);

        try {
            tienda.cambiarLogo(archivo.getBytes(), archivo.getContentType());
        } catch (IOException e) {
            throw new ReglaDeNegocioException("No se pudo leer el archivo enviado: " + e.getMessage());
        }

        Tienda guardada = tiendaRepository.save(tienda);
        return tiendaMapper.aResponse(guardada, (int) productoRepository.countByVendedorIdAndActivoTrue(vendedor.getId()), null);
    }

    @Override
    @Transactional(readOnly = true)
    public ArchivoImagen obtenerLogo(String username) {
        Usuario vendedor = buscarVendedor(username);
        Tienda tienda = tiendaRepository.findByVendedorId(vendedor.getId())
                .filter(Tienda::tieneLogo)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "La tienda de " + username + " todavía no tiene logo"));

        return new ArchivoImagen(tienda.getLogo(), tienda.getLogoContentType(), "logo-" + username);
    }

    private Usuario buscarVendedor(String username) {
        return usuarioRepository.findByUsername(username)
                .filter(usuario -> usuario.getRol() == Rol.VENDEDOR && usuario.isActivo())
                .orElseThrow(() -> new RecursoNoEncontradoException("No se encontró la tienda de " + username));
    }

    private Tienda tiendaDe(Usuario vendedor) {
        return tiendaRepository.findByVendedorId(vendedor.getId())
                .orElseGet(() -> Tienda.porDefecto(vendedor));
    }

    private List<Producto> productosActivos(Usuario vendedor) {
        return productoRepository.findByVendedorIdOrderByFechaAltaDesc(vendedor.getId()).stream()
                .filter(Producto::isActivo)
                .toList();
    }

    private void validarArchivo(MultipartFile archivo) {
        if (archivo == null || archivo.isEmpty()) {
            throw new ReglaDeNegocioException("Tenés que adjuntar un archivo de imagen");
        }

        String tipo = archivo.getContentType();
        if (tipo == null || !TIPOS_PERMITIDOS.contains(tipo.toLowerCase())) {
            throw new ReglaDeNegocioException(
                    "El logo tiene que ser una imagen (JPG, PNG, WEBP o GIF). Se recibió: " + tipo);
        }
    }
}
