package igrejavidanova.com.igrejavidanova.controllers;

import igrejavidanova.com.igrejavidanova.dto.playlist.PlaylistDTO;
import igrejavidanova.com.igrejavidanova.dto.playlist.ShowPlaylistDTO;
import igrejavidanova.com.igrejavidanova.services.playlist.CreatePlaylistService;
import igrejavidanova.com.igrejavidanova.services.playlist.DeletePlaylistService;
import igrejavidanova.com.igrejavidanova.services.playlist.GetPlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/playlist")
@RequiredArgsConstructor
public class PlaylistController {

    private final CreatePlaylistService createPlaylistService;
    private final GetPlaylistService getPlaylistService;
    private final DeletePlaylistService deletePlaylistService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> criarPlaylist(@RequestBody PlaylistDTO playlistDTO){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(createPlaylistService.createPlaylist(playlistDTO));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ShowPlaylistDTO>> listar() {
        try {
            return ResponseEntity.ok(getPlaylistService.getPlaylists());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        deletePlaylistService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
