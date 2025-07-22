package igrejavidanova.com.igrejavidanova.repository;

import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.enums.MemberType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Integer> {
    Optional<MemberEntity> findByEmail(String email);
    Optional<MemberEntity> findByFullNameAndUsername(String fullName, String username);
    @Query(value = "SELECT * FROM membros WHERE MONTH(birthday) = :month", nativeQuery = true)
    List<MemberEntity> findByBirthdayMonth(@Param("month") int month);

    Optional<MemberEntity> findByIdAndMemberType(int id, MemberType type);

    Optional<MemberEntity> findById(int id);

    List<MemberEntity> findAllByMemberType(MemberType type);

    @Query("SELECT m FROM membros m WHERE m.memberType = 'OBREIRO' AND m.id NOT IN (" +
            "SELECT eo.obreiro.id FROM evento_obreiro eo WHERE eo.evento.id = :eventoId)")
    List<MemberEntity> findObreirosNaoRelacionadosAoEvento(@Param("eventoId") int eventoId);

}
