package igrejavidanova.com.igrejavidanova.services.funcoes;

import igrejavidanova.com.igrejavidanova.dto.funcoes.FuncaoDTO;
import igrejavidanova.com.igrejavidanova.entities.FuncaoEntity;
import igrejavidanova.com.igrejavidanova.repository.FuncaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CreateFuncaoService {

    private final FuncaoRepository funcoesRepository;

    public FuncaoEntity createFuncaoEntity(FuncaoDTO funcao){
        FuncaoEntity funcaoCriada = getFuncao(funcao);
        return funcoesRepository.save(funcaoCriada);
    }

    private FuncaoEntity getFuncao(FuncaoDTO funcao){
        return FuncaoEntity.builder()
                .nomeFuncao(funcao.getNomeFuncao())
                .build();
    }

}
