package igrejavidanova.com.igrejavidanova.repository;

import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import igrejavidanova.com.igrejavidanova.entities.EventoObreiroEntity;
import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventoObreiroRepository extends JpaRepository<EventoObreiroEntity, Integer> {

    List<EventoObreiroEntity> findByEventoId(int id);

    @Query(value = "SELECT eo. * FROM evento_obreiro eo join evento e on eo.evento_id = e.id WHERE MONTH(e.data) = :month and eo.membro_id = :idObreiro", nativeQuery = true)
    List<EventoObreiroEntity> findByMonth(@Param("month") int month, @Param("idObreiro") int idObreiro);
}