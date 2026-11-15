package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.Tienda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TiendaRepository extends JpaRepository<Tienda, Long> {
    Optional<Tienda> findByVendedorId(Long vendedorId);
}
