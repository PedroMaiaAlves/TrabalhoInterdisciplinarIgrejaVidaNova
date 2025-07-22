package igrejavidanova.com.igrejavidanova.repository;

import igrejavidanova.com.igrejavidanova.entities.CerimoniaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CerimoniaRepository extends JpaRepository<CerimoniaEntity, Integer> {

    @Query(value = """
        SELECT * 
        FROM cerimonia
        WHERE MEMBRO_ID = :id
        ORDER BY 
            CASE 
                WHEN STATUS = 'PROCESSANDO' THEN 1
                WHEN STATUS = 'ACEITO' THEN 2
                ELSE 3 
            END,
            DATA ASC
        """, nativeQuery = true)
    List<CerimoniaEntity> findAllByMemberEntity_Id(@Param("id") int id);

    List<CerimoniaEntity> findByData(LocalDate date);
}
