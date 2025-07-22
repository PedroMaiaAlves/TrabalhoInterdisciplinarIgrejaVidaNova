package igrejavidanova.com.igrejavidanova.services.cerimonia;

import igrejavidanova.com.igrejavidanova.dto.cerimonia.AtualizarStatusDTO;
import igrejavidanova.com.igrejavidanova.dto.cerimonia.ShowCerimoniaDTO;
import igrejavidanova.com.igrejavidanova.dto.cerimonia.UpdateCerimoniaDTO;
import igrejavidanova.com.igrejavidanova.entities.CerimoniaEntity;
import igrejavidanova.com.igrejavidanova.enums.CerimoniaType;
import igrejavidanova.com.igrejavidanova.enums.StatusType;
import igrejavidanova.com.igrejavidanova.repository.CerimoniaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UpdateCerimoniaService {

    private final CerimoniaRepository cerimoniaRepository;

    public ShowCerimoniaDTO atualizarStatus(AtualizarStatusDTO atualizarStatusDTO, int id){
        CerimoniaEntity cerimoniaEntity = cerimoniaRepository.getReferenceById(id);
        cerimoniaEntity.setStatus(atualizarStatusDTO.getStatusType());
        cerimoniaRepository.save(cerimoniaEntity);
        return retorno(cerimoniaEntity);
    }

    public ShowCerimoniaDTO atualizarCerimonia(UpdateCerimoniaDTO updateCerimoniaDTO, int id){
        CerimoniaEntity cerimoniaEntity = cerimoniaRepository.getReferenceById(id);
        cerimoniaEntity = update(updateCerimoniaDTO, cerimoniaEntity);
        return retorno(cerimoniaEntity);
    }

    private CerimoniaEntity update(UpdateCerimoniaDTO updateCerimoniaDTO, CerimoniaEntity cerimoniaEntity){
        cerimoniaEntity.setData(updateCerimoniaDTO.getData());
        cerimoniaEntity.setDescricao(updateCerimoniaDTO.getDescricao());
        cerimoniaEntity.setQuantidadeConvidados(updateCerimoniaDTO.getQuantidadeConvidados());
        return cerimoniaRepository.save(cerimoniaEntity);
    }

    private ShowCerimoniaDTO retorno(CerimoniaEntity cerimoniaEntity){
        return ShowCerimoniaDTO.builder()
                .id(cerimoniaEntity.getId())
                .status(cerimoniaEntity.getStatus())
                .cerimoniaType(cerimoniaEntity.getCerimoniaType())
                .data(cerimoniaEntity.getData())
                .descricao(cerimoniaEntity.getDescricao())
                .quantidadeConvidados(cerimoniaEntity.getQuantidadeConvidados())
                .build();
    }
}
