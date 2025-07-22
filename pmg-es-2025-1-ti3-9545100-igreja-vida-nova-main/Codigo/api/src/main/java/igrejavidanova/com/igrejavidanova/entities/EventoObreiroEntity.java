package igrejavidanova.com.igrejavidanova.entities;

import igrejavidanova.com.igrejavidanova.enums.MemberType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "evento_obreiro")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class EventoObreiroEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "evento_id")
    private EventoEntity evento;

    @ManyToOne
    @JoinColumn(name = "membro_id", nullable = false)
    private MemberEntity obreiro;

    @ManyToOne
    @JoinColumn(name = "funcao_id")
    private FuncaoEntity funcao;
}
