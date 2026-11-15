package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.dto.resena.ResenaRequest;
import com.motorroll.motorroll_api.dto.resena.ResenasDelProductoResponse;
import com.motorroll.motorroll_api.exception.RecursoDuplicadoException;
import com.motorroll.motorroll_api.exception.RecursoNoEncontradoException;
import com.motorroll.motorroll_api.exception.ReglaDeNegocioException;
import com.motorroll.motorroll_api.mapper.ResenaMapper;
import com.motorroll.motorroll_api.model.Producto;
import com.motorroll.motorroll_api.model.Resena;
import com.motorroll.motorroll_api.model.Rol;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.OrdenRepository;
import com.motorroll.motorroll_api.repository.ProductoRepository;
import com.motorroll.motorroll_api.repository.ResenaRepository;
import com.motorroll.motorroll_api.repository.UsuarioRepository;
import com.motorroll.motorroll_api.service.ResenaService;
import com.motorroll.motorroll_api.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ResenaServiceImpl implements ResenaService {
    private final ResenaRepository resenaRepository;
    private final ProductoRepository productoRepository;
    private final OrdenRepository ordenRepository;
    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;
    private final ResenaMapper resenaMapper;

    @Override
    @Transactional(readOnly = true)
    public ResenasDelProductoResponse listar(Long productoId, String username) {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RecursoNoEncontradoException("el producto", productoId));

        ResenasDelProductoResponse respuesta =
                resenaMapper.aResumen(resenaRepository.findByProductoIdOrderByFechaDesc(productoId));
        respuesta.setPuedeOpinar(username != null && puedeOpinar(username, producto));
        return respuesta;
    }

    private boolean puedeOpinar(String username, Producto producto) {
        return usuarioRepository.findByUsername(username)
                .filter(usuario -> usuario.getRol() == Rol.COMPRADOR)
                .filter(usuario -> !producto.getVendedor().getId().equals(usuario.getId()))
                .filter(usuario -> ordenRepository.comproElProducto(usuario.getId(), producto.getId()))
                .filter(usuario -> !resenaRepository.existsByProductoIdAndAutorId(producto.getId(), usuario.getId()))
                .isPresent();
    }

    @Override
    @Transactional
    public ResenasDelProductoResponse opinar(String username, Long productoId, ResenaRequest request) {
        Usuario autor = usuarioService.buscarEntidadPorUsername(username);
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RecursoNoEncontradoException("el producto", productoId));

        if (producto.getVendedor().getId().equals(autor.getId())) {
            throw new ReglaDeNegocioException("No podés opinar sobre tus propias publicaciones");
        }
        if (!ordenRepository.comproElProducto(autor.getId(), productoId)) {
            throw new ReglaDeNegocioException("Solo pueden opinar quienes compraron este producto");
        }
        if (resenaRepository.existsByProductoIdAndAutorId(productoId, autor.getId())) {
            throw new RecursoDuplicadoException("Ya dejaste tu opinión sobre este producto");
        }

        resenaRepository.save(Resena.builder()
                .producto(producto)
                .autor(autor)
                .estrellas(request.getEstrellas())
                .comentario(request.getComentario().trim())
                .build());

        return resenaMapper.aResumen(resenaRepository.findByProductoIdOrderByFechaDesc(productoId));
    }
}
