package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {
    List<Orden> findByCompradorIdOrderByFechaDesc(Long compradorId);

    Optional<Orden> findByIdAndCompradorId(Long id, Long compradorId);

    @Query("""
            SELECT CASE WHEN COUNT(o) > 0 THEN true ELSE false END FROM Orden o JOIN o.items i
            WHERE o.comprador.id = :compradorId AND i.producto.id = :productoId
            """)
    boolean comproElProducto(@Param("compradorId") Long compradorId, @Param("productoId") Long productoId);
}
