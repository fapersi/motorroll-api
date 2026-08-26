package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.Carrito;
import com.motorroll.motorroll_api.model.EstadoCarrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {

    Optional<Carrito> findByCompradorIdAndEstado(Long compradorId, EstadoCarrito estado);
}
