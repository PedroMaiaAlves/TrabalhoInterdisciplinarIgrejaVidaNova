package igrejavidanova.com.igrejavidanova.dto.cerimonia;

import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.enums.CerimoniaType;
import igrejavidanova.com.igrejavidanova.enums.StatusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowCerimoniaDTO {

    private int id;
    private StatusType status;
    private CerimoniaType cerimoniaType;
    private LocalDate data;
    private String descricao;
    private int quantidadeConvidados;
}
