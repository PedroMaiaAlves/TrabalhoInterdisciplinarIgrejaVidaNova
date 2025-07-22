package igrejavidanova.com.igrejavidanova.services.evento;

import igrejavidanova.com.igrejavidanova.dto.evento.AtualizarStatusDTO;
import igrejavidanova.com.igrejavidanova.dto.evento.EventoDTO;
import igrejavidanova.com.igrejavidanova.dto.evento.UpdateEventoDTO;
import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import igrejavidanova.com.igrejavidanova.repository.EventoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateEventoService {
    private final EventoRepository eventoRepository;

    public EventoEntity updateEvento(UpdateEventoDTO updateEventoDTO, int id){
        try {
            EventoEntity evento = eventoRepository.getReferenceById(id);

            evento.setEndereco(updateEventoDTO.getEndereco());
            evento.setData(updateEventoDTO.getData());
            evento.setTema(updateEventoDTO.getTema());
            try {
                evento.setFoto(updateEventoDTO.getFoto().getBytes());
            }catch (Exception e){
                throw new EntityNotFoundException("Foto inexistente");
            }

            return eventoRepository.save(evento);
        } catch (EntityNotFoundException e) {
            throw new RuntimeException("Nenhum evento encontrado");
        }
    }

    public EventoDTO updateSatuts(int id, AtualizarStatusDTO atualizarStatusDTO){
        EventoEntity evento = eventoRepository.getReferenceById(id);
        evento.setStatus(atualizarStatusDTO.getStatusType());
        eventoRepository.save(evento);
        return EventoDTO.builder()
                .tema(evento.getTema())
                .data(evento.getData())
                .endereco(evento.getEndereco())
                .id(evento.getId())
                .build();
    }
}
