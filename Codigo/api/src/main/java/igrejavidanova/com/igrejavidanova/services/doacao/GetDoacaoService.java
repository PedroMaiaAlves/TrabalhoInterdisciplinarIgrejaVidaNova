package igrejavidanova.com.igrejavidanova.services.doacao;

import igrejavidanova.com.igrejavidanova.dto.doacao.ShowDoacaoDTO;
import igrejavidanova.com.igrejavidanova.entities.DoacaoEntity;
import igrejavidanova.com.igrejavidanova.repository.DoacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetDoacaoService {

    private final DoacaoRepository doacaoRepository;

    public List<ShowDoacaoDTO> getAll(){
        List<DoacaoEntity> doacaoEntities = doacaoRepository.findAll();
        return getShowDoacaoDTO(doacaoEntities);
    }

    private List<ShowDoacaoDTO> getShowDoacaoDTO(List<DoacaoEntity> doacaoEntities){
        return doacaoEntities.stream()
                .map(doacao -> ShowDoacaoDTO.builder()
                        .id(doacao.getId())
                        .meta(doacao.getMeta())
                        .titulo(doacao.getTitulo())
                        .descricao(doacao.getDescricao())
                        .valorArrecadado(doacao.getValorArrecadado())
                        .fotoBase64(doacao.getFoto() != null ? Base64.getEncoder().encodeToString(doacao.getFoto()) : null)
                        .build())
                .toList();
    }
}
