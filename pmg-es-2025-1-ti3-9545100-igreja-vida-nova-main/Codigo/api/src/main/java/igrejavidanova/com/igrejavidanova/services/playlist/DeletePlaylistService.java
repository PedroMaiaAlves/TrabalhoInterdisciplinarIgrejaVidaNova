package igrejavidanova.com.igrejavidanova.services.playlist;

import igrejavidanova.com.igrejavidanova.repository.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeletePlaylistService {

    private final PlaylistRepository playlistRepository;

    public void deletar(int id){
        playlistRepository.deleteById(id);
    }
}
