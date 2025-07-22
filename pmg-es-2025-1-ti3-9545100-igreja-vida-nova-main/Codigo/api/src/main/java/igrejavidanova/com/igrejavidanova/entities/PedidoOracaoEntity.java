package igrejavidanova.com.igrejavidanova.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "pedidoOracao")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PedidoOracaoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "culto_id", nullable = false)
    private EventoEntity eventoEntity;

    private String descricao;
}
