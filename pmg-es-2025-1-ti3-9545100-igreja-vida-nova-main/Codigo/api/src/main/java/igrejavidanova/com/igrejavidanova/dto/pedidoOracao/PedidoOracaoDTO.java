package igrejavidanova.com.igrejavidanova.dto.pedidoOracao;

import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedidoOracaoDTO {
    private int id;
    private String descricao;
}
