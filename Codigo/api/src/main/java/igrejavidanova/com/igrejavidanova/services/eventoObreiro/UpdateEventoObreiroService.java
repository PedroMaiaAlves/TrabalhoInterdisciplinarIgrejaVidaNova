package igrejavidanova.com.igrejavidanova.services.eventoObreiro;

import igrejavidanova.com.igrejavidanova.dto.eventoObreiro.AlterarFuncaoDTO;
import igrejavidanova.com.igrejavidanova.dto.eventoObreiro.EventoObreiroDTO;
import igrejavidanova.com.igrejavidanova.entities.EventoObreiroEntity;
import igrejavidanova.com.igrejavidanova.entities.FuncaoEntity;
import igrejavidanova.com.igrejavidanova.repository.EventoObreiroRepository;
import igrejavidanova.com.igrejavidanova.repository.FuncaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UpdateEventoObreiroService {

    private final EventoObreiroRepository  eventoObreiroRepository;
    private final FuncaoRepository funcaoRepository;

    public EventoObreiroDTO alterarFuncaoObreiro(AlterarFuncaoDTO alterarFuncaoDTO, int id) {
        EventoObreiroEntity eventoObreiroEntity = eventoObreiroRepository.getReferenceById(id);

        FuncaoEntity funcaoEntity = funcaoRepository.findById(alterarFuncaoDTO.getIdDaFuncao())
                .orElseThrow(() -> new IllegalArgumentException("Função com ID " + alterarFuncaoDTO.getIdDaFuncao() + " não encontrada."));

        eventoObreiroEntity.setFuncao(funcaoEntity);
        eventoObreiroRepository.save(eventoObreiroEntity);
        return retorno(eventoObreiroEntity);
    }

    private EventoObreiroDTO retorno(EventoObreiroEntity eventoObreiroEntity){
        return EventoObreiroDTO.builder()
                .id(eventoObreiroEntity.getId())
                .evento(eventoObreiroEntity.getEvento())
                .obreiro(eventoObreiroEntity.getObreiro())
                .funcao(eventoObreiroEntity.getFuncao())
                .build();
    }
}