package igrejavidanova.com.igrejavidanova.services.evento;

import igrejavidanova.com.igrejavidanova.repository.EventoRepository;
import igrejavidanova.com.igrejavidanova.repository.PedidoOracaoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteEventoService {
    private final EventoRepository eventoRepository;
    private final PedidoOracaoRepository pedidoOracaoRepository;

    @Transactional
    public void deleteEvento(int id) {
        try {
            pedidoOracaoRepository.deleteByCultoId(id);
            eventoRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new RuntimeException("Evento com ID " + id + " não encontrado.");
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Não foi possível excluir o evento com ID " + id +
                    " pois há registros relacionados a ele.");
        } catch (Exception e) {
            throw new RuntimeException("Erro inesperado ao excluir o evento com ID " + id + ": " + e.getMessage());
        }
    }
}