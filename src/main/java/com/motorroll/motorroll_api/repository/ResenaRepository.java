package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.Resena;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResenaRepository extends JpaRepository<Resena, Long> {
    List<Resena> findByProductoIdOrderByFechaDesc(Long productoId);

    boolean existsByProductoIdAndAutorId(Long productoId, Long autorId);
}
