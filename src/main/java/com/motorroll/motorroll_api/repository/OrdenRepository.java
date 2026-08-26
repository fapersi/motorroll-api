package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {

    List<Orden> findByCompradorIdOrderByFechaDesc(Long compradorId);

    Optional<Orden> findByIdAndCompradorId(Long id, Long compradorId);
}
