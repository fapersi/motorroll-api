package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.Producto;
import org.springframework.data.domain.Sort;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    @Query("""
            SELECT p FROM Producto p
            LEFT JOIN p.categoria c
            LEFT JOIN c.categoriaPadre cp
            WHERE p.activo = true
              AND p.vendedor.activo = true
              AND (:todasLasCategorias = true OR c.id IN :categoriaIds OR cp.id IN :categoriaIds)
              AND (:marca IS NULL OR LOWER(p.marca) = LOWER(:marca))
              AND (:precioMin IS NULL OR ROUND(p.precio * (100 - p.descuento) / 100, 2) >= :precioMin)
              AND (:precioMax IS NULL OR ROUND(p.precio * (100 - p.descuento) / 100, 2) <= :precioMax)
              AND (:soloConStock = false OR p.stock > 0)
            """)
    List<Producto> buscarConFiltros(@Param("todasLasCategorias") boolean todasLasCategorias,
                                    @Param("categoriaIds") List<Long> categoriaIds,
                                    @Param("marca") String marca,
                                    @Param("precioMin") BigDecimal precioMin,
                                    @Param("precioMax") BigDecimal precioMax,
                                    @Param("soloConStock") boolean soloConStock,
                                    Sort orden);

    Optional<Producto> findByIdAndActivoTrue(Long id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Producto p WHERE p.id = :id AND p.activo = true")
    Optional<Producto> buscarBancoParaReservar(@Param("id") Long id);

    @Query("""
            SELECT p FROM Producto p JOIN p.fichaTecnica f
            WHERE p.activo = true AND p.esServicio = false AND p.vendedor.activo = true
            ORDER BY p.precio
            """)
    List<Producto> listarBancosParaProbar();

    List<Producto> findByVendedorIdOrderByFechaAltaDesc(Long vendedorId);

    long countByVendedorIdAndActivoTrue(Long vendedorId);

    @Query("SELECT DISTINCT p.marca FROM Producto p WHERE p.activo = true AND p.marca IS NOT NULL ORDER BY p.marca")
    List<String> listarMarcas();
}
