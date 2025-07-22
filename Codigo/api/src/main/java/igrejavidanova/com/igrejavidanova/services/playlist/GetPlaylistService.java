package igrejavidanova.com.igrejavidanova.services.playlist;

import igrejavidanova.com.igrejavidanova.dto.playlist.PlaylistDTO;
import igrejavidanova.com.igrejavidanova.dto.playlist.ShowPlaylistDTO;
import igrejavidanova.com.igrejavidanova.entities.PlaylistEntity;
import igrejavidanova.com.igrejavidanova.repository.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetPlaylistService {

    private final PlaylistRepository playlistRepository;

    public List<ShowPlaylistDTO> getPlaylists(){
        List<PlaylistEntity> playlists = playlistRepository.findAll();

        return playlists.stream()
                .map(playlist -> ShowPlaylistDTO.builder()
                        .id(playlist.getId())
                        .link(playlist.getLink())
                        .videoID(playlist.getVideoID())
                        .build()).toList();
    }
}
