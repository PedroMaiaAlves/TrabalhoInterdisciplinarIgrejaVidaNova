package igrejavidanova.com.igrejavidanova.dto.evento;

import igrejavidanova.com.igrejavidanova.enums.EventType;
import igrejavidanova.com.igrejavidanova.enums.StatusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventoDTO {
    private int id;
    private EventType tipo;
    private String endereco;
    private LocalDateTime data;
    private String tema;
    private StatusType status;
    private String fotoBase64;
}
