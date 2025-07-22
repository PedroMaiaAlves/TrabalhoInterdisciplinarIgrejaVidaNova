package igrejavidanova.com.igrejavidanova.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import igrejavidanova.com.igrejavidanova.enums.EventType;
import igrejavidanova.com.igrejavidanova.enums.StatusType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@Entity(name ="evento")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class EventoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private EventType tipo;

    private String endereco;

    @Enumerated(EnumType.STRING)
    private StatusType status;

    private LocalDateTime data;
    private String tema;

    @Lob
    @Column(columnDefinition = "LONGBLOB", nullable = true)
    private byte[] foto;
}
