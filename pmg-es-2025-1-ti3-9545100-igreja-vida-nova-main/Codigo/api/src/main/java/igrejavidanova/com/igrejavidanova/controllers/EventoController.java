package igrejavidanova.com.igrejavidanova.controllers;

import igrejavidanova.com.igrejavidanova.dto.evento.*;
import igrejavidanova.com.igrejavidanova.entities.EventoEntity;
import igrejavidanova.com.igrejavidanova.services.evento.CreateEventoService;
import igrejavidanova.com.igrejavidanova.services.evento.DeleteEventoService;
import igrejavidanova.com.igrejavidanova.services.evento.GetEventoService;
import igrejavidanova.com.igrejavidanova.services.evento.UpdateEventoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/evento")
@RestController
@RequiredArgsConstructor
public class EventoController {
    private final CreateEventoService createEventoService;
    private final UpdateEventoService updateEventoService;
    private final DeleteEventoService deleteEventoService;
    private final GetEventoService getEventoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarEvento(@ModelAttribute @Valid CreateEventoDTO createEventoDTO) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(createEventoService.createEvento(createEventoDTO));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/pesquisar/{id}")
    public ResponseEntity<EventoDTO> pesquisarEvento(@PathVariable int id) {
        try {
            return ResponseEntity.ok(getEventoService.getById(id));
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<EventoEntity> atualizarEvento(@ModelAttribute @Valid UpdateEventoDTO updateEventoDTO, @PathVariable int id) {
        try {
            return ResponseEntity.ok(updateEventoService.updateEvento(updateEventoDTO, id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarEvento(@PathVariable int id) {
        try {
            deleteEventoService.deleteEvento(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/listarEventos")
    public ResponseEntity<List<EventoDTO>> listarEventos(){
        try {
            return ResponseEntity.ok(getEventoService.getAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/listar/mesAtual")
    public ResponseEntity<Object> listarEventosMesAtual() {
        try {
            return ResponseEntity.ok(getEventoService.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum evento encontrado3");
        }
    }

    @GetMapping("/proximoCulto")
    public ResponseEntity<ShowCultoDTO> getProximoCulto(){
        try{
            return ResponseEntity.ok(getEventoService.proximoCulto());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/atualizarStatus/{id}")
    public ResponseEntity<EventoDTO> atualizarStatus(@PathVariable int id, @RequestBody AtualizarStatusDTO atualizarStatusDTO) {
        try{
            return ResponseEntity.ok(updateEventoService.updateSatuts(id, atualizarStatusDTO));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}

