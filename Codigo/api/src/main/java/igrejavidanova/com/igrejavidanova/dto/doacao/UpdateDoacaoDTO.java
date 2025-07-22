package igrejavidanova.com.igrejavidanova.dto.doacao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateDoacaoDTO {
    private int id;
    private double meta;
    private String titulo;
    private String descricao;
    private MultipartFile foto;
}
