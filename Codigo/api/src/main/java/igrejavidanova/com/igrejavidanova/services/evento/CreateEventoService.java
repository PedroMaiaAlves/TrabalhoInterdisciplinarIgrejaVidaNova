package igrejavidanova.com.igrejavidanova.services.evento;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Base64;

import igrejavidanova.com.igrejavidanova.dto.evento.CreateEventoDTO;
import igrejavidanova.com.igrejavidanova.enums.EventType;
import igrejavidanova.com.igrejavidanova.enums.StatusType;
import igrejavidanova.com.igrejavidanova.repository.CerimoniaRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import igrejavidanova.com.igrejavidanova.dto.evento.EventoDTO;
import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import igrejavidanova.com.igrejavidanova.repository.EventoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StreamUtils;

@Service
@RequiredArgsConstructor
public class CreateEventoService {
    private final EventoRepository eventoRepository;
    private final CerimoniaRepository cerimoniaRepository;

    public EventoDTO createEvento(CreateEventoDTO createEventoDTO){
        LocalDate dataEvento = createEventoDTO.getData().toLocalDate();
        LocalDateTime inicioDoDia = dataEvento.atStartOfDay();
        LocalDateTime fimDoDia = dataEvento.atTime(LocalTime.MAX);

        boolean existeEventoNoMesmoDia = !eventoRepository
                .findByDataBetween(inicioDoDia, fimDoDia)
                .isEmpty();

        boolean existeCerimoniaNoMesmoDia = !cerimoniaRepository
                .findByData(dataEvento)
                .isEmpty();

        if (existeEventoNoMesmoDia || existeCerimoniaNoMesmoDia) {
            throw new IllegalArgumentException("Já existe um evento ou cerimônia marcada para este dia.");
        }

        if (dataEvento.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Não é possível criar um evento com data no passado.");
        }

        EventoEntity createdEvento = getAndSaveEventoEntity(createEventoDTO);
        createEventoDTO.setId(createdEvento.getId());
        return retorno(createdEvento);
    }

    private EventoDTO retorno(EventoEntity eventoEntity) {
        return EventoDTO.builder()
                .id(eventoEntity.getId())
                .tema(eventoEntity.getTema())
                .tipo(eventoEntity.getTipo())
                .data(eventoEntity.getData())
                .endereco(eventoEntity.getEndereco())
                .fotoBase64(eventoEntity.getFoto() != null && eventoEntity.getFoto().length > 0 ?
                        Base64.getEncoder().encodeToString(eventoEntity.getFoto()) :
                        getDefaultImageBase64())
                .build();
    }

    private String getDefaultImageBase64() {
        try {
            ClassPathResource imgFile = new ClassPathResource("static/images/default-event.png");
            byte[] defaultImage = StreamUtils.copyToByteArray(imgFile.getInputStream());
            return Base64.getEncoder().encodeToString(defaultImage);
        } catch (IOException e) {
            return ""; // ou lance uma exceção
        }
    }

    private EventoEntity getAndSaveEventoEntity(CreateEventoDTO createEventoDTO){
        EventoEntity eventoEntity;
        try {
            eventoEntity = EventoEntity.builder()
                    .tipo(createEventoDTO.getTipo())
                    .endereco(createEventoDTO.getEndereco())
                    .tema(createEventoDTO.getTema())
                    .data(createEventoDTO.getData())
                    .foto(createEventoDTO.getFoto().getBytes())
                    .build();
        } catch (IOException e) {
            throw new RuntimeException("Erro ao processar a imagem enviada.", e);
        }

        if(createEventoDTO.getTipo().equals(EventType.CULTO))
            eventoEntity.setStatus(StatusType.ACEITO);
        else {
            eventoEntity.setStatus(StatusType.PROCESSANDO);
        }

        return eventoRepository.save(eventoEntity);
    }
}
