package igrejavidanova.com.igrejavidanova.dto.evento;

import igrejavidanova.com.igrejavidanova.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateEventoDTO {
    private int id;
    private EventType tipo;
    private String endereco;
    private LocalDateTime data;
    private String tema;
    private MultipartFile foto;
}
