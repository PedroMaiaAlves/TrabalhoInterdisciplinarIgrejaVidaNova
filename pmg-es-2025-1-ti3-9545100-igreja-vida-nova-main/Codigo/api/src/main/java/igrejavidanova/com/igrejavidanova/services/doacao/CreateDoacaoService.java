package igrejavidanova.com.igrejavidanova.services.doacao;

import igrejavidanova.com.igrejavidanova.dto.doacao.DoacaoDTO;
import igrejavidanova.com.igrejavidanova.entities.DoacaoEntity;
import igrejavidanova.com.igrejavidanova.repository.DoacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateDoacaoService {

    private final DoacaoRepository doacaoRepository;

    public DoacaoDTO createDoacao(DoacaoDTO doacaoDTO) {
        DoacaoEntity doacao = createDoacaoEntity(doacaoDTO);
        doacaoRepository.save(doacao);
        doacaoDTO.setId(doacao.getId());
        return doacaoDTO;
    }

    private DoacaoEntity createDoacaoEntity(DoacaoDTO doacaoDTO) {
        try{
            return DoacaoEntity.builder()
                    .meta(doacaoDTO.getMeta())
                    .titulo(doacaoDTO.getTitulo())
                    .descricao(doacaoDTO.getDescricao())
                    .valorArrecadado(0.0)
                    .foto(doacaoDTO.getFoto().getBytes())
                    .build();
        }catch(Exception e){
            throw new RuntimeException("Erro ao salvar doação");
        }
    }
}
