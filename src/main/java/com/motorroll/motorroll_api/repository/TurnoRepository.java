package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.EstadoTurno;
import com.motorroll.motorroll_api.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {
    List<Turno> findByClienteIdOrderByFechaDescHoraDesc(Long clienteId);

    List<Turno> findByEstadoAndFechaAfter(EstadoTurno estado, LocalDate fecha);

    boolean existsByBancoIdAndFechaAndHoraAndEstado(Long bancoId, LocalDate fecha, String hora, EstadoTurno estado);

    boolean existsByClienteIdAndFechaAndHoraAndEstado(Long clienteId, LocalDate fecha, String hora, EstadoTurno estado);
}
