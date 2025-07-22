package igrejavidanova.com.igrejavidanova.services.funcoes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import igrejavidanova.com.igrejavidanova.dto.funcoes.FuncaoDTO;
import igrejavidanova.com.igrejavidanova.entities.FuncaoEntity;
import igrejavidanova.com.igrejavidanova.repository.FuncaoRepository;

@Service
public class UpdateFuncaoService {

    @Autowired
    private FuncaoRepository funcoesRepository;

    
    public FuncaoEntity update(FuncaoDTO funcao, int id){
        FuncaoEntity func = funcoesRepository.getReferenceById(id);

        if(func == null){
            throw new RuntimeException("Função nao encontrada");
        }

        func.setNomeFuncao(funcao.getNomeFuncao());
        return funcoesRepository.save(func);
    }
}
