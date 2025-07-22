package igrejavidanova.com.igrejavidanova.dto.cerimonia;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCerimoniaDTO {
    private LocalDate data;
    private String descricao;
    private int quantidadeConvidados;
}
