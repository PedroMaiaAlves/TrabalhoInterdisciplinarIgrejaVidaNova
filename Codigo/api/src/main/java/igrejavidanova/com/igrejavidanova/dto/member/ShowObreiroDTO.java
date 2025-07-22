package igrejavidanova.com.igrejavidanova.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowObreiroDTO {
    private int id;
    private String nome;
}