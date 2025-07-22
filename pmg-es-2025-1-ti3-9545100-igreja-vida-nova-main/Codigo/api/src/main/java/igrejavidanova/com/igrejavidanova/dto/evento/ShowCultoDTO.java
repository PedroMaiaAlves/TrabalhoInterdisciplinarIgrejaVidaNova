package igrejavidanova.com.igrejavidanova.dto.evento;

import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShowCultoDTO {

    private int id;
    private String tema;
    private LocalDateTime data;

    public ShowCultoDTO(EventoEntity evento) {
        this.id = evento.getId();
        this.tema = evento.getTema();
        this.data = evento.getData();
    }
}
