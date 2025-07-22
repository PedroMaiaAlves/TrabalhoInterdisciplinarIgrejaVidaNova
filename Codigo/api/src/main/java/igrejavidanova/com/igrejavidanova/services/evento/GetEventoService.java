package igrejavidanova.com.igrejavidanova.services.evento;

import igrejavidanova.com.igrejavidanova.dto.evento.EventoDTO;
import igrejavidanova.com.igrejavidanova.dto.evento.ShowCultoDTO;
import igrejavidanova.com.igrejavidanova.dto.evento.UpdateEventoDTO;
import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import igrejavidanova.com.igrejavidanova.enums.EventType;
import igrejavidanova.com.igrejavidanova.repository.EventoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetEventoService {
    private final EventoRepository eventoRepository;

    public EventoDTO getById(int id){
        EventoEntity evento = eventoRepository.getReferenceById(id);
        return EventoDTO.builder()
                .id(evento.getId())
                .endereco(evento.getEndereco())
                .tema(evento.getTema())
                .tipo(evento.getTipo())
                .data(evento.getData())
                .build();
    }

    public List<EventoDTO> getAll(){
        List<EventoEntity> eventos = eventoRepository.findByDataGreaterThanEqual(LocalDateTime.now());

        return eventos.stream()
                .map(evento -> EventoDTO.builder()
                        .id(evento.getId())
                        .tipo(evento.getTipo())
                        .tema(evento.getTema())
                        .endereco(evento.getEndereco())
                        .data(evento.getData())
                        .status(evento.getStatus())
                        .fotoBase64(evento.getFoto() != null ? Base64.getEncoder().encodeToString(evento.getFoto()) : null)
                        .build()
                ).toList();
    }

    public List<Object> get() {
        int mesAtual = java.time.LocalDate.now().getMonthValue();
        List<Object> eventos = new ArrayList<>();
        getEventosDTO(mesAtual, eventos);

        if (eventos.isEmpty()) {
            throw new RuntimeException("Nenhum evento encontrado");
        }
        return eventos;
    }

    private void getEventosDTO(int mesAtual, List<Object> eventos) {
        List<EventoEntity> eventoEntityList = eventoRepository.findByMonth(mesAtual);

        eventoEntityList.forEach(e -> eventos.add(UpdateEventoDTO.builder()
                .id(e.getId())
                .tipo(e.getTipo())
                .tema(e.getTema())
                .data(e.getData())
                .endereco(e.getEndereco())
                .build())
        );
    }

    public ShowCultoDTO proximoCulto(){
        Optional<EventoEntity> evento = eventoRepository.findFirstByTipoAndDataAfterOrderByDataAsc(EventType.CULTO,  LocalDateTime.now());

        return evento
                .map(ShowCultoDTO::new)
                .orElseThrow(() -> new RuntimeException("Nenhum culto futuro encontrado."));
    }
}
