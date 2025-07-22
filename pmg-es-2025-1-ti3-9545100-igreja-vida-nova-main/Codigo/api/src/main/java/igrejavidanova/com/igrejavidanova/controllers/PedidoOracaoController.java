package igrejavidanova.com.igrejavidanova.controllers;

import igrejavidanova.com.igrejavidanova.dto.pedidoOracao.PedidoOracaoDTO;
import igrejavidanova.com.igrejavidanova.dto.pedidoOracao.ShowPedidoOracaoDTO;
import igrejavidanova.com.igrejavidanova.services.pedidoOracao.CreatePedidoOracaoService;
import igrejavidanova.com.igrejavidanova.services.pedidoOracao.GetPedidoOracaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidoOracao")
@RequiredArgsConstructor
public class PedidoOracaoController {
    private final CreatePedidoOracaoService createPedidoOracaoService;
    private final GetPedidoOracaoService getPedidoOracaoService;

    @PostMapping("/cadastrar/{id}")
    public ResponseEntity<PedidoOracaoDTO> cadastrar(@RequestBody PedidoOracaoDTO pedidoOracaoDTO, @PathVariable int id){
        try{
            return ResponseEntity.ok(createPedidoOracaoService.cadastrar(pedidoOracaoDTO, id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ShowPedidoOracaoDTO>> listar(){
        try{
            return ResponseEntity.ok(getPedidoOracaoService.getAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
