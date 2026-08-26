package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.dto.categoria.CategoriaRequest;
import com.motorroll.motorroll_api.dto.categoria.CategoriaResponse;
import com.motorroll.motorroll_api.exception.RecursoDuplicadoException;
import com.motorroll.motorroll_api.exception.RecursoNoEncontradoException;
import com.motorroll.motorroll_api.exception.ReglaDeNegocioException;
import com.motorroll.motorroll_api.mapper.CategoriaMapper;
import com.motorroll.motorroll_api.model.Categoria;
import com.motorroll.motorroll_api.repository.CategoriaRepository;
import com.motorroll.motorroll_api.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final CategoriaMapper categoriaMapper;

    @Override
    @Transactional(readOnly = true)
    public List<CategoriaResponse> listar() {
        return categoriaMapper.aResponse(categoriaRepository.findAll(Sort.by("nombre")));
    }

    @Override
    @Transactional(readOnly = true)
    public CategoriaResponse obtenerPorId(Long id) {
        return categoriaMapper.aResponse(buscarEntidad(id));
    }

    @Override
    @Transactional
    public CategoriaResponse crear(CategoriaRequest request) {
        // El usuario solo manda la descripcion y el nombre: el id lo genera la base.
        if (categoriaRepository.existsByNombreIgnoreCase(request.getNombre())) {
            throw new RecursoDuplicadoException("La categoria que intentas agregar ya existe: " + request.getNombre());
        }

        Categoria categoria = Categoria.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .categoriaPadre(resolverPadre(request.getCategoriaPadreId(), null))
                .build();

        return categoriaMapper.aResponse(categoriaRepository.save(categoria));
    }

    @Override
    @Transactional
    public CategoriaResponse actualizar(Long id, CategoriaRequest request) {
        Categoria categoria = buscarEntidad(id);

        boolean cambioElNombre = !categoria.getNombre().equalsIgnoreCase(request.getNombre());
        if (cambioElNombre && categoriaRepository.existsByNombreIgnoreCase(request.getNombre())) {
            throw new RecursoDuplicadoException("Ya existe otra categoria llamada " + request.getNombre());
        }

        categoria.setNombre(request.getNombre());
        categoria.setDescripcion(request.getDescripcion());
        categoria.setCategoriaPadre(resolverPadre(request.getCategoriaPadreId(), id));

        return categoriaMapper.aResponse(categoriaRepository.save(categoria));
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        Categoria categoria = buscarEntidad(id);

        if (!categoria.getProductos().isEmpty()) {
            throw new ReglaDeNegocioException("No se puede eliminar la categoria porque tiene productos publicados");
        }
        if (categoriaRepository.countByCategoriaPadreId(id) > 0) {
            throw new ReglaDeNegocioException("No se puede eliminar la categoria porque tiene subcategorias");
        }

        categoriaRepository.delete(categoria);
    }

    private Categoria resolverPadre(Long categoriaPadreId, Long idQueSeEdita) {
        if (categoriaPadreId == null) {
            return null;
        }
        if (categoriaPadreId.equals(idQueSeEdita)) {
            throw new ReglaDeNegocioException("Una categoria no puede ser su propia categoria padre");
        }
        return buscarEntidad(categoriaPadreId);
    }

    private Categoria buscarEntidad(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("la categoria", id));
    }
}
