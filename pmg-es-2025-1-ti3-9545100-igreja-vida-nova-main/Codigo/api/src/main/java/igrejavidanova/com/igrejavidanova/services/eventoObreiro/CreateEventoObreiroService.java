package igrejavidanova.com.igrejavidanova.services.eventoObreiro;

import igrejavidanova.com.igrejavidanova.dto.eventoObreiro.EventoObreiroDTO;
import igrejavidanova.com.igrejavidanova.entities.EventoObreiroEntity;
import igrejavidanova.com.igrejavidanova.repository.EventoObreiroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateEventoObreiroService {

    private final EventoObreiroRepository eventoObreiroRepository;

    public EventoObreiroDTO create(EventoObreiroDTO eventoObreiroDTO) {
        EventoObreiroEntity evento = createEventoObreiroEntity(eventoObreiroDTO);
        eventoObreiroRepository.save(evento);
        eventoObreiroDTO.setId(evento.getId());
        return eventoObreiroDTO;
    }

    private EventoObreiroEntity createEventoObreiroEntity(EventoObreiroDTO eventoObreiroDTO) {
        return EventoObreiroEntity.builder()
                .evento(eventoObreiroDTO.getEvento())
                .obreiro(eventoObreiroDTO.getObreiro())
                .funcao(eventoObreiroDTO.getFuncao())
                .build();
    }
}
