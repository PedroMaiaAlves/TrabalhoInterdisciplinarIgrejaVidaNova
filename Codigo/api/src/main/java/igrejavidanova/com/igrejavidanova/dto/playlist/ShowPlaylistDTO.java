package igrejavidanova.com.igrejavidanova.dto.playlist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowPlaylistDTO {

    private int id;
    private String link;
    private String videoID;
}
