package igrejavidanova.com.igrejavidanova.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "doacao")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoacaoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double meta;
    private double valorArrecadado;
    private String titulo;
    private String descricao;
    @Lob
    @Column(columnDefinition = "LONGBLOB", nullable = true)
    private byte[] foto;
}
