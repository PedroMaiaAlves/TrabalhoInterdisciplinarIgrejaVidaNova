package igrejavidanova.com.igrejavidanova.dto.doacao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class DoarDinheiroDTO {
    private int id;
    private double valor;
}
