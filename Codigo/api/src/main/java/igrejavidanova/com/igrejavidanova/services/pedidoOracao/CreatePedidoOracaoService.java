package igrejavidanova.com.igrejavidanova.services.pedidoOracao;

import igrejavidanova.com.igrejavidanova.dto.pedidoOracao.PedidoOracaoDTO;
import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import igrejavidanova.com.igrejavidanova.entities.PedidoOracaoEntity;
import igrejavidanova.com.igrejavidanova.repository.EventoRepository;
import igrejavidanova.com.igrejavidanova.repository.PedidoOracaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreatePedidoOracaoService {

    private final PedidoOracaoRepository pedidoOracaoRepository;
    private final EventoRepository eventoRepository;

    public PedidoOracaoDTO cadastrar(PedidoOracaoDTO pedidoOracaoDTO, int id){
        EventoEntity eventoEntity = eventoRepository.getReferenceById(id);

        PedidoOracaoEntity pedido = create(pedidoOracaoDTO);
        pedido.setEventoEntity(eventoEntity);
        pedidoOracaoRepository.save(pedido);
        pedidoOracaoDTO.setId(pedido.getId());
        return pedidoOracaoDTO;
    }

    private PedidoOracaoEntity create(PedidoOracaoDTO pedidoOracaoDTO){
        return PedidoOracaoEntity.builder()
                .descricao(pedidoOracaoDTO.getDescricao())
                .build();
    }
}
