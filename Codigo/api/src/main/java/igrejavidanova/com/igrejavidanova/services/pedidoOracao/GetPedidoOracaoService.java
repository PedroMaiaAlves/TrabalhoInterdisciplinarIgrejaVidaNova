package igrejavidanova.com.igrejavidanova.services.pedidoOracao;

import igrejavidanova.com.igrejavidanova.dto.pedidoOracao.ShowPedidoOracaoDTO;
import igrejavidanova.com.igrejavidanova.entities.PedidoOracaoEntity;
import igrejavidanova.com.igrejavidanova.repository.PedidoOracaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetPedidoOracaoService {
    private final PedidoOracaoRepository pedidoOracaoRepository;

    public List<ShowPedidoOracaoDTO> getAll(){
        List<PedidoOracaoEntity> pedidos = pedidoOracaoRepository.findAll();

        return pedidos.stream()
                .map(p -> ShowPedidoOracaoDTO.builder()
                .id(p.getId())
                .evento(p.getEventoEntity())
                .descricao(p.getDescricao()).build())
                .toList();
    }
}
