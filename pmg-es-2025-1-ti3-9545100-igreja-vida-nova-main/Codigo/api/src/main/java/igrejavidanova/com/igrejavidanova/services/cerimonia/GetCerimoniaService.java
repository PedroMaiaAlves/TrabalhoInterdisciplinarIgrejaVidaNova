package igrejavidanova.com.igrejavidanova.services.cerimonia;

import igrejavidanova.com.igrejavidanova.dto.cerimonia.ShowCerimoniaDTO;
import igrejavidanova.com.igrejavidanova.entities.CerimoniaEntity;
import igrejavidanova.com.igrejavidanova.enums.StatusType;
import igrejavidanova.com.igrejavidanova.repository.CerimoniaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetCerimoniaService {

    private final CerimoniaRepository cerimoniaRepository;

    public List<ShowCerimoniaDTO> getAll(){
        List<CerimoniaEntity> cerimoniaEntities = cerimoniaRepository.findAll();
        return getAllCerimoniaDTO(cerimoniaEntities);
    }

    public List<ShowCerimoniaDTO> getCerimoniasUser(int id){
        List<CerimoniaEntity> cerimoniaEntities = cerimoniaRepository.findAllByMemberEntity_Id(id);
        return getAllCerimoniaDTO(cerimoniaEntities);
    }

    private List<ShowCerimoniaDTO> getAllCerimoniaDTO(List<CerimoniaEntity> cerimoniaEntities){
        return cerimoniaEntities.stream()
                .map(cerimonia -> ShowCerimoniaDTO.builder()
                        .id(cerimonia.getId())
                        .cerimoniaType(cerimonia.getCerimoniaType())
                        .status(cerimonia.getStatus())
                        .data(cerimonia.getData())
                        .descricao(cerimonia.getDescricao())
                        .quantidadeConvidados(cerimonia.getQuantidadeConvidados())
                        .build()).toList();
    }

}
