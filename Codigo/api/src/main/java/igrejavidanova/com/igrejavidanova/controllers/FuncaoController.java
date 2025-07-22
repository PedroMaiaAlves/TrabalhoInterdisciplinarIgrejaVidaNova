package igrejavidanova.com.igrejavidanova.controllers;

import igrejavidanova.com.igrejavidanova.dto.funcoes.FuncaoDTO;
import igrejavidanova.com.igrejavidanova.entities.FuncaoEntity;
import igrejavidanova.com.igrejavidanova.services.funcoes.CreateFuncaoService;
import igrejavidanova.com.igrejavidanova.services.funcoes.DeleteFuncaoService;
import igrejavidanova.com.igrejavidanova.services.funcoes.GetFuncaoService;
import igrejavidanova.com.igrejavidanova.services.funcoes.UpdateFuncaoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/funcao")
@RequiredArgsConstructor
public class FuncaoController {

    private final CreateFuncaoService createFuncaoService;
    private final UpdateFuncaoService updateFuncaoService;
    private final GetFuncaoService getFuncaoService;
    private final DeleteFuncaoService deleteFuncaoService;

    @PostMapping("/criar")
    public ResponseEntity<Object> cadastrarFuncao(@RequestBody @Valid FuncaoDTO funcaoDTO){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(createFuncaoService.createFuncaoEntity(funcaoDTO));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    } 

    @GetMapping("/listar")
    public ResponseEntity<List<FuncaoEntity>> getFuncaoesCadastradas(){
        return ResponseEntity.ok(getFuncaoService.getFuncoes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarFuncao(@RequestBody @Valid FuncaoDTO funcaoDTO, @PathVariable int id){
        try{
            return ResponseEntity.ok(updateFuncaoService.update(funcaoDTO, id));
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dados Incorretos");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarFuncao(@PathVariable int id){
            deleteFuncaoService.delete(id);
            return ResponseEntity.noContent().build();
    }

}
