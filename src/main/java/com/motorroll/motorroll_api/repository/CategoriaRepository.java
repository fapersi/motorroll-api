package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    Optional<Categoria> findByNombreIgnoreCase(String nombre);

    boolean existsByNombreIgnoreCase(String nombre);

    List<Categoria> findByCategoriaPadreIsNull();

    long countByCategoriaPadreId(Long categoriaPadreId);
}
