package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.dto.resena.ResenaRequest;
import com.motorroll.motorroll_api.dto.resena.ResenasDelProductoResponse;
import com.motorroll.motorroll_api.exception.RecursoDuplicadoException;
import com.motorroll.motorroll_api.exception.RecursoNoEncontradoException;
import com.motorroll.motorroll_api.exception.ReglaDeNegocioException;
import com.motorroll.motorroll_api.mapper.ResenaMapper;
import com.motorroll.motorroll_api.model.Producto;
import com.motorroll.motorroll_api.model.Resena;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.OrdenRepository;
import com.motorroll.motorroll_api.repository.ProductoRepository;
import com.motorroll.motorroll_api.repository.ResenaRepository;
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
    private final UsuarioService usuarioService;
    private final ResenaMapper resenaMapper;

    @Override
    @Transactional(readOnly = true)
    public ResenasDelProductoResponse listar(Long productoId) {
        if (!productoRepository.existsById(productoId)) {
            throw new RecursoNoEncontradoException("el producto", productoId);
        }
        return resenaMapper.aResumen(resenaRepository.findByProductoIdOrderByFechaDesc(productoId));
    }

    @Override
    @Transactional
    public ResenasDelProductoResponse opinar(String username, Long productoId, ResenaRequest request) {
        Usuario autor = usuarioService.buscarEntidadPorUsername(username);
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RecursoNoEncontradoException("el producto", productoId));

        if (!ordenRepository.comproElProducto(autor.getId(), productoId)) {
            throw new ReglaDeNegocioException("Solo pueden opinar quienes compraron este producto");
        }
        if (resenaRepository.existsByProductoIdAndAutorId(productoId, autor.getId())) {
            throw new RecursoDuplicadoException("Ya dejaste tu opinion sobre este producto");
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
