package igrejavidanova.com.igrejavidanova.dto.doacao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoacaoDTO {
    private int id;
    private double meta;
    private double valorArrecadado;
    private String titulo;
    private String descricao;
    private MultipartFile foto;
}
