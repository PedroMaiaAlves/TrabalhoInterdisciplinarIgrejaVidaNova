package igrejavidanova.com.igrejavidanova.services.cerimonia;

import igrejavidanova.com.igrejavidanova.dto.cerimonia.CreateCerimoniaDTO;
import igrejavidanova.com.igrejavidanova.entities.CerimoniaEntity;
import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.enums.StatusType;
import igrejavidanova.com.igrejavidanova.repository.CerimoniaRepository;
import igrejavidanova.com.igrejavidanova.repository.EventoRepository;
import igrejavidanova.com.igrejavidanova.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class CreateCerimoniaService {

    private final CerimoniaRepository cerimoniaRepository;
    private final EventoRepository eventoRepository;
    private final MemberRepository memberRepository;

    public CreateCerimoniaDTO createCerimonia(CreateCerimoniaDTO createCerimoniaDTO, int idMembro) {
        LocalDate dataCerimonia = createCerimoniaDTO.getData();

        // Verifica se já existe uma cerimônia no mesmo dia
        boolean existeCerimoniaNoMesmoDia = !cerimoniaRepository
                .findByData(dataCerimonia)
                .isEmpty();

        if (existeCerimoniaNoMesmoDia) {
            throw new IllegalArgumentException("Já existe uma cerimônia marcada para este dia.");
        }

        boolean existeEventoNoMesmoDia = eventoRepository
                .findAll()
                .stream()
                .anyMatch(evento -> evento.getData().toLocalDate().isEqual(dataCerimonia));

        if (existeEventoNoMesmoDia) {
            throw new IllegalArgumentException("Já existe um evento marcado para este dia.");
        }

        // Verifica se a data não é no passado
        if (dataCerimonia.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Não é possível criar uma cerimônia com data no passado.");
        }

        CerimoniaEntity cerimoniaEntity = createCerimoniaEntity(createCerimoniaDTO, idMembro);
        cerimoniaRepository.save(cerimoniaEntity);
        createCerimoniaDTO.setId(cerimoniaEntity.getId());
        return createCerimoniaDTO;
    }

    private CerimoniaEntity createCerimoniaEntity(CreateCerimoniaDTO createCerimoniaDTO, int idMembro) {
        return CerimoniaEntity.builder()
                .cerimoniaType(createCerimoniaDTO.getCerimoniaType())
                .status(StatusType.PROCESSANDO)
                .data(createCerimoniaDTO.getData())
                .descricao(createCerimoniaDTO.getDescricao())
                .quantidadeConvidados(createCerimoniaDTO.getQuantidadeConvidados())
                .memberEntity(getMemberEntity(idMembro))
                .build();
    }

    private MemberEntity getMemberEntity(int idMembro) {
        return memberRepository.getReferenceById(idMembro);
    }
}
