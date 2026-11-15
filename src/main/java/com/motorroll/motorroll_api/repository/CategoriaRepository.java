package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    boolean existsByNombreIgnoreCase(String nombre);

    long countByCategoriaPadreId(Long categoriaPadreId);
}
