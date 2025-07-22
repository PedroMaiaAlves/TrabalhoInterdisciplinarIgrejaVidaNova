package igrejavidanova.com.igrejavidanova.dto.funcoes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CadastroFuncaoObreiroDTO {
    private int evento_id;
    private int obreiro_id;
    private int funcao_id;
}
