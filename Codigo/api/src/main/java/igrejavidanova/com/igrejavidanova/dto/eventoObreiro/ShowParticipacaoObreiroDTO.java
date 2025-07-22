package igrejavidanova.com.igrejavidanova.dto.eventoObreiro;

import igrejavidanova.com.igrejavidanova.entities.FuncaoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowParticipacaoObreiroDTO {

    private String tema;
    private LocalDateTime data;
    private String funcaoEntity;
    
}
