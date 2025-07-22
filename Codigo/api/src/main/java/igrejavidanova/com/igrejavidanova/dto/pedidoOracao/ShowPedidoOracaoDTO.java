package igrejavidanova.com.igrejavidanova.dto.pedidoOracao;

import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ShowPedidoOracaoDTO {
    private int id;
    private String descricao;
    private EventoEntity evento;
}
