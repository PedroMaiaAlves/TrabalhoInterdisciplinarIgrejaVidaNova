package igrejavidanova.com.igrejavidanova.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.enums.MemberType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import igrejavidanova.com.igrejavidanova.enums.EventType;

public interface EventoRepository extends JpaRepository<EventoEntity, Integer> {
    @Query(value = "SELECT * FROM evento WHERE MONTH(data) = :month", nativeQuery = true)
    List<EventoEntity> findByMonth(@Param("month") int month);

    Optional<EventoEntity> findFirstByTipoAndDataAfterOrderByDataAsc(EventType tipo, LocalDateTime data);
    List<EventoEntity> findByDataBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);

    List<EventoEntity> findByDataGreaterThanEqual(LocalDateTime data);

    List<EventoEntity> findAllByTipo(EventType tipo);
}
