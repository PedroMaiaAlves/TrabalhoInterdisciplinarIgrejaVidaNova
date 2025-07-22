package igrejavidanova.com.igrejavidanova.services.playlist;

import igrejavidanova.com.igrejavidanova.dto.playlist.PlaylistDTO;
import igrejavidanova.com.igrejavidanova.entities.PlaylistEntity;
import igrejavidanova.com.igrejavidanova.repository.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class CreatePlaylistService {

    private final PlaylistRepository playlistRepository;

    public PlaylistDTO  createPlaylist(PlaylistDTO playlistDTO){
        PlaylistEntity playlistEntity = createPlaylistEntity(playlistDTO);
        playlistEntity = playlistRepository.save(playlistEntity);
        playlistDTO.setId(playlistEntity.getId());
        return playlistDTO;
    }

    private PlaylistEntity createPlaylistEntity(PlaylistDTO playlistDTO){
        return PlaylistEntity.builder()
                .link(playlistDTO.getLink())
                .videoID(extractYoutubeId(playlistDTO.getLink()))
                .build();
    }

    private String extractYoutubeId(String link) {
        String regex = "^(?:https?://)?(?:www\\.)?(?:youtube\\.com/watch\\?v=|youtu\\.be/)([\\w-]{11})";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(link);

        if (matcher.find()) {
            return matcher.group(1);
        } else {
            return null;
        }
    }

}
