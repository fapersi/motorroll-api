package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.Rol;
import com.motorroll.motorroll_api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmailIgnoreCase(String email);

    List<Usuario> findByRolAndActivoTrueOrderByIdAsc(Rol rol);
}
