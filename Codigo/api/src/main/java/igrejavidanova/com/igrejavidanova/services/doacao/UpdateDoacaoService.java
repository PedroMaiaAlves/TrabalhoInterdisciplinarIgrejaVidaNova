package igrejavidanova.com.igrejavidanova.services.doacao;

import igrejavidanova.com.igrejavidanova.dto.doacao.DoacaoDTO;
import igrejavidanova.com.igrejavidanova.dto.doacao.DoarDinheiroDTO;
import igrejavidanova.com.igrejavidanova.dto.doacao.ShowDoacaoDTO;
import igrejavidanova.com.igrejavidanova.dto.doacao.UpdateDoacaoDTO;
import igrejavidanova.com.igrejavidanova.entities.DoacaoEntity;
import igrejavidanova.com.igrejavidanova.repository.DoacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class UpdateDoacaoService {

    private final DoacaoRepository doacaoRepository;

    public ShowDoacaoDTO UpdateDoacao(UpdateDoacaoDTO updateDoacaoDTO, int id) {
        DoacaoEntity doacao = doacaoRepository.getReferenceById(id);
        doacao = atualizarDoacao(doacao, updateDoacaoDTO);
        return retorno(doacao);
    }

    public ShowDoacaoDTO doarDinehiro(DoarDinheiroDTO doarDinheiroDTO, int id) {
        DoacaoEntity doacao = doacaoRepository.getReferenceById(id);
        doacao = doarDinehiroEntity(doarDinheiroDTO, doacao);
        return retorno(doacao);
    }

    private DoacaoEntity doarDinehiroEntity(DoarDinheiroDTO doarDinheiroDTO, DoacaoEntity doacaoEntity) {
        double valorArrecadado = doacaoEntity.getValorArrecadado();
        valorArrecadado += doarDinheiroDTO.getValor();
        doacaoEntity.setValorArrecadado(valorArrecadado);
        return doacaoRepository.save(doacaoEntity);
    }

    private ShowDoacaoDTO retorno(DoacaoEntity doacao) {
        return ShowDoacaoDTO.builder()
                .id(doacao.getId())
                .meta(doacao.getMeta())
                .titulo(doacao.getTitulo())
                .descricao(doacao.getDescricao())
                .valorArrecadado(doacao.getValorArrecadado())
                .fotoBase64(Base64.getEncoder().encodeToString(doacao.getFoto()))
                .build();
    }

    private DoacaoEntity atualizarDoacao(DoacaoEntity doacaoEntity, UpdateDoacaoDTO updateDoacaoDTO) {
        doacaoEntity.setTitulo(updateDoacaoDTO.getTitulo());
        doacaoEntity.setDescricao(updateDoacaoDTO.getDescricao());
        doacaoEntity.setMeta(updateDoacaoDTO.getMeta());
        try{
            doacaoEntity.setFoto(updateDoacaoDTO.getFoto().getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Erro ao atualizar foto.");
        }
        return  doacaoRepository.save(doacaoEntity);
    }
}
