package igrejavidanova.com.igrejavidanova.controllers;

import igrejavidanova.com.igrejavidanova.dto.doacao.DoacaoDTO;
import igrejavidanova.com.igrejavidanova.dto.doacao.DoarDinheiroDTO;
import igrejavidanova.com.igrejavidanova.dto.doacao.ShowDoacaoDTO;
import igrejavidanova.com.igrejavidanova.dto.doacao.UpdateDoacaoDTO;
import igrejavidanova.com.igrejavidanova.services.doacao.CreateDoacaoService;
import igrejavidanova.com.igrejavidanova.services.doacao.DeleteDoacaoService;
import igrejavidanova.com.igrejavidanova.services.doacao.GetDoacaoService;
import igrejavidanova.com.igrejavidanova.services.doacao.UpdateDoacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doacao")
@RequiredArgsConstructor
public class DoacaoController {

    private final CreateDoacaoService createDoacaoService;
    private final UpdateDoacaoService updateDoacaoService;
    private final DeleteDoacaoService deleteDoacaoService;
    private final GetDoacaoService getDoacaoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<DoacaoDTO> cadastrarDoacao(@ModelAttribute DoacaoDTO doacaoDTO) {
        try{
            return ResponseEntity.ok(createDoacaoService.createDoacao(doacaoDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<ShowDoacaoDTO> atualizarDoacao(@ModelAttribute UpdateDoacaoDTO updateDoacaoDTO, @PathVariable int id) {
        try{
            return ResponseEntity.ok(updateDoacaoService.UpdateDoacao(updateDoacaoDTO, id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarDoacao(@PathVariable int id) {
        try{
            deleteDoacaoService.deleteDoacao(id);
            return  ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ShowDoacaoDTO>> listarDoacoes(){
        try{
            return ResponseEntity.ok(getDoacaoService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/doarDinheiro/{id}")
    public ResponseEntity<ShowDoacaoDTO> realizarDoacao(@RequestBody @Valid DoarDinheiroDTO doarDinheiroDTO, @PathVariable int id) {
        try{
            return ResponseEntity.ok(updateDoacaoService.doarDinehiro(doarDinheiroDTO, id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
