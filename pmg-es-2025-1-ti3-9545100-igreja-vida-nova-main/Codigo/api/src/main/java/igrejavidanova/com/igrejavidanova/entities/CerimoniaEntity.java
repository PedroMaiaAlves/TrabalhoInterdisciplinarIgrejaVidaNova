package igrejavidanova.com.igrejavidanova.entities;

import igrejavidanova.com.igrejavidanova.enums.CerimoniaType;
import igrejavidanova.com.igrejavidanova.enums.StatusType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity(name = "cerimonia")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CerimoniaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private CerimoniaType cerimoniaType;

    @Enumerated(EnumType.STRING)
    private StatusType status;

    private LocalDate data;
    private String descricao;
    private int quantidadeConvidados;

    @ManyToOne
    @JoinColumn(name = "membro_id")
    private MemberEntity memberEntity;
}
