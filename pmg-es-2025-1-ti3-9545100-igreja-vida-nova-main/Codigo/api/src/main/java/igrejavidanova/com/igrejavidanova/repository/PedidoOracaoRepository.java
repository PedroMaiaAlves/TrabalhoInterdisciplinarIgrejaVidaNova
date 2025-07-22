package igrejavidanova.com.igrejavidanova.repository;

import igrejavidanova.com.igrejavidanova.entities.PedidoOracaoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PedidoOracaoRepository extends JpaRepository<PedidoOracaoEntity, Integer> {

    @Modifying
    @Query(value = "DELETE FROM pedido_oracao WHERE culto_id = :cultoId", nativeQuery = true)
    void deleteByCultoId(@Param("cultoId") int cultoId);
}