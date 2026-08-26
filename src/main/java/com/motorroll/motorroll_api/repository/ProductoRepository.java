package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.Producto;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    /**
     * Busqueda del catalogo con todos los filtros opcionales: cuando un parametro llega en null
     * esa condicion no filtra nada. Si categoriaId apunta a una categoria padre, tambien
     * devuelve los productos de sus subcategorias.
     */
    @Query("""
            SELECT p FROM Producto p
            LEFT JOIN p.categoria c
            LEFT JOIN c.categoriaPadre cp
            WHERE p.activo = true
              AND (:texto IS NULL
                   OR LOWER(p.nombre) LIKE LOWER(CONCAT('%', :texto, '%'))
                   OR LOWER(p.descripcion) LIKE LOWER(CONCAT('%', :texto, '%')))
              AND (:categoriaId IS NULL OR c.id = :categoriaId OR cp.id = :categoriaId)
              AND (:marca IS NULL OR LOWER(p.marca) = LOWER(:marca))
              AND (:precioMin IS NULL OR p.precio >= :precioMin)
              AND (:precioMax IS NULL OR p.precio <= :precioMax)
              AND (:soloConStock = false OR p.stock > 0)
            """)
    List<Producto> buscarConFiltros(@Param("texto") String texto,
                                    @Param("categoriaId") Long categoriaId,
                                    @Param("marca") String marca,
                                    @Param("precioMin") BigDecimal precioMin,
                                    @Param("precioMax") BigDecimal precioMax,
                                    @Param("soloConStock") boolean soloConStock,
                                    Sort orden);

    Optional<Producto> findByIdAndActivoTrue(Long id);

    List<Producto> findByVendedorIdOrderByFechaAltaDesc(Long vendedorId);

    @Query("SELECT DISTINCT p.marca FROM Producto p WHERE p.activo = true AND p.marca IS NOT NULL ORDER BY p.marca")
    List<String> listarMarcas();
}
