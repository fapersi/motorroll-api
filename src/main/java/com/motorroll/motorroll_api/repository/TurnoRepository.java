package com.motorroll.motorroll_api.repository;

import com.motorroll.motorroll_api.model.EstadoTurno;
import com.motorroll.motorroll_api.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Long> {
    List<Turno> findByClienteIdOrderByFechaDescHoraDesc(Long clienteId);

    List<Turno> findByEstadoAndFechaAfter(EstadoTurno estado, LocalDate fecha);

    boolean existsByBancoIdAndFechaAndHoraAndEstado(Long bancoId, LocalDate fecha, String hora, EstadoTurno estado);
}
