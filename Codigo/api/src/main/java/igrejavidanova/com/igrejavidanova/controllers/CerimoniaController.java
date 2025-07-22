package igrejavidanova.com.igrejavidanova.controllers;

import igrejavidanova.com.igrejavidanova.dto.cerimonia.AtualizarStatusDTO;
import igrejavidanova.com.igrejavidanova.dto.cerimonia.CreateCerimoniaDTO;
import igrejavidanova.com.igrejavidanova.dto.cerimonia.ShowCerimoniaDTO;
import igrejavidanova.com.igrejavidanova.dto.cerimonia.UpdateCerimoniaDTO;
import igrejavidanova.com.igrejavidanova.services.cerimonia.CreateCerimoniaService;
import igrejavidanova.com.igrejavidanova.services.cerimonia.GetCerimoniaService;
import igrejavidanova.com.igrejavidanova.services.cerimonia.UpdateCerimoniaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cerimonia")
@RequiredArgsConstructor
public class CerimoniaController {

    private final CreateCerimoniaService createCerimoniaService;
    private final GetCerimoniaService getCerimoniaService;
    private final UpdateCerimoniaService updateCerimoniaService;

    @PostMapping("/cadastrar/{id}")
    public ResponseEntity<?> criarCerimonia(@RequestBody @Valid CreateCerimoniaDTO createCerimoniaDTO, @PathVariable int id){
        try{
            return ResponseEntity.ok(createCerimoniaService.createCerimonia(createCerimoniaDTO, id));
        }catch(Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ShowCerimoniaDTO>> listaDeCerimonias(){
        try{
            return ResponseEntity.ok(getCerimoniaService.getAll());
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/listarPorUsuario/{id}")
    public ResponseEntity<List<ShowCerimoniaDTO>> listaPorUsuario(@PathVariable int id){
        try{
            return ResponseEntity.ok(getCerimoniaService.getCerimoniasUser(id));
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/atualizarStatus/{id}")
    public ResponseEntity<ShowCerimoniaDTO> atualizarStatus(@PathVariable int id, @RequestBody AtualizarStatusDTO atualizarStatusDTO){
        try{
            return ResponseEntity.ok(updateCerimoniaService.atualizarStatus(atualizarStatusDTO, id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/atualizarCerimonia/{id}")
    public ResponseEntity<ShowCerimoniaDTO> atualizarCerimonia(@PathVariable int id, @RequestBody UpdateCerimoniaDTO updateCerimoniaDTO){
        try{
            return ResponseEntity.ok(updateCerimoniaService.atualizarCerimonia(updateCerimoniaDTO, id));
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
