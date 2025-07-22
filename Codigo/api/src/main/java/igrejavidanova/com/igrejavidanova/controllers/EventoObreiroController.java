package igrejavidanova.com.igrejavidanova.controllers;

import igrejavidanova.com.igrejavidanova.dto.eventoObreiro.AlterarFuncaoDTO;
import igrejavidanova.com.igrejavidanova.dto.eventoObreiro.EventoObreiroDTO;
import igrejavidanova.com.igrejavidanova.dto.eventoObreiro.ShowParticipacaoObreiroDTO;
import igrejavidanova.com.igrejavidanova.dto.member.ShowObreiroDTO;
import igrejavidanova.com.igrejavidanova.services.eventoObreiro.CreateEventoObreiroService;
import igrejavidanova.com.igrejavidanova.services.eventoObreiro.DeleteEventoObreiroService;
import igrejavidanova.com.igrejavidanova.services.eventoObreiro.GetEventoObreiroService;
import igrejavidanova.com.igrejavidanova.services.eventoObreiro.UpdateEventoObreiroService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/eventoObreiro")
@RequiredArgsConstructor
public class EventoObreiroController {

    private final CreateEventoObreiroService createEventoObreiroService;
    private final GetEventoObreiroService getEventoObreiroService;
    private final DeleteEventoObreiroService deleteEventoObreiroService;
    private final UpdateEventoObreiroService updateEventoObreiroService;

    @PostMapping("/criar")
    public ResponseEntity<EventoObreiroDTO> criarEvento(@RequestBody @Valid EventoObreiroDTO eventoObreiroDTO) {
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(createEventoObreiroService.create(eventoObreiroDTO));
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/alterarFuncao/{id}")
    public ResponseEntity<EventoObreiroDTO> alterarFuncao(@RequestBody @Valid AlterarFuncaoDTO alterarFuncaoDTO, @PathVariable int id){
        try {
            return ResponseEntity.ok(updateEventoObreiroService.alterarFuncaoObreiro(alterarFuncaoDTO, id));
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/listaDeEventoObreiro/{id}")
    public ResponseEntity<List<EventoObreiroDTO>> listaDeEventoObreiro(@PathVariable int id){
        try{
            return ResponseEntity.ok(getEventoObreiroService.listaPorEvento(id));
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable int id){
        deleteEventoObreiroService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/listaObreiros/{id}")
    public ResponseEntity<List<ShowObreiroDTO>> listaDeObreiros(@PathVariable int id){
        try{
            return ResponseEntity.ok(getEventoObreiroService.listaDeObreirosNaoRelacionados(id));
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/participacoesObreiro/{id}")
    public ResponseEntity<List<ShowParticipacaoObreiroDTO>> listaParticipacoesObreiro(@PathVariable int id){
        try{
            return ResponseEntity.ok(getEventoObreiroService.listaDeParticipacoesObreiro(id));
        }catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
}