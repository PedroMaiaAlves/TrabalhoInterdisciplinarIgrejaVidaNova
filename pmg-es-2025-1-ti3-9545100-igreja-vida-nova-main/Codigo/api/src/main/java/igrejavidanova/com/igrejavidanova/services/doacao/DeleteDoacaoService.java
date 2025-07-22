package igrejavidanova.com.igrejavidanova.services.doacao;

import igrejavidanova.com.igrejavidanova.dto.doacao.DoacaoDTO;
import igrejavidanova.com.igrejavidanova.repository.DoacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteDoacaoService {

    private final DoacaoRepository doacaoRepository;

    public void deleteDoacao(int id) {
        doacaoRepository.deleteById(id);
    }
}
