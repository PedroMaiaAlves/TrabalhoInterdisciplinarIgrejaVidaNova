package igrejavidanova.com.igrejavidanova.dto.evento;

import igrejavidanova.com.igrejavidanova.enums.StatusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AtualizarStatusDTO {

    private StatusType statusType;
}
