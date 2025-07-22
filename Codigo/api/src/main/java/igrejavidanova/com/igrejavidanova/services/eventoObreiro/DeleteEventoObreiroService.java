package igrejavidanova.com.igrejavidanova.services.eventoObreiro;

import igrejavidanova.com.igrejavidanova.repository.EventoObreiroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteEventoObreiroService {

    private final EventoObreiroRepository eventoObreiroRepository;

    public void delete(int id){
        eventoObreiroRepository.deleteById(id);
    }
}
