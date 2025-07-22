package igrejavidanova.com.igrejavidanova.services.funcoes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import igrejavidanova.com.igrejavidanova.entities.FuncaoEntity;
import igrejavidanova.com.igrejavidanova.repository.FuncaoRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class GetFuncaoService {

    @Autowired
    private FuncaoRepository funcoesRepository;

    public FuncaoEntity getFuncaoById(int id){
        try{
            return funcoesRepository.getReferenceById(id); 
        }catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Função não encontrada");
        }
    }

    public List<FuncaoEntity> getFuncoes(){
        List<FuncaoEntity> funcoes = funcoesRepository.findAll();
        return funcoes;
    }
}
