package igrejavidanova.com.igrejavidanova.dto.eventoObreiro;

import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import igrejavidanova.com.igrejavidanova.entities.FuncaoEntity;
import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class EventoObreiroDTO {
    private int id;
    private EventoEntity evento;
    private MemberEntity obreiro;
    private FuncaoEntity funcao;
}
