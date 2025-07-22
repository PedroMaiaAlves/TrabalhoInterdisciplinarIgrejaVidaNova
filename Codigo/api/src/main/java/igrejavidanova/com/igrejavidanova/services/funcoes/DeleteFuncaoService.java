package igrejavidanova.com.igrejavidanova.services.funcoes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import igrejavidanova.com.igrejavidanova.repository.FuncaoRepository;

@Service
public class DeleteFuncaoService {

    @Autowired
    private FuncaoRepository funcoesRepository;

    public void delete(int id){
        funcoesRepository.deleteById(id);
    }
}
