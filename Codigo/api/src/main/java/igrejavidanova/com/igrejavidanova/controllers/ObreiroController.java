package igrejavidanova.com.igrejavidanova.controllers;

import igrejavidanova.com.igrejavidanova.dto.member.MemberDTO;
import igrejavidanova.com.igrejavidanova.dto.member.ShowMemberDTO;
import igrejavidanova.com.igrejavidanova.services.obreiros.DeleteObreiroService;
import igrejavidanova.com.igrejavidanova.services.obreiros.GetObreiroService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/obreiros")
@RequiredArgsConstructor
public class ObreiroController {
     
    private final GetObreiroService getObreiroService;
    private final DeleteObreiroService deleteObreiroService;

    @GetMapping("/")
    public ResponseEntity<?> listarObreiros() {
        try {
            List<ShowMemberDTO> obreiros = getObreiroService.getAll();
            return ResponseEntity.ok(obreiros);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Obreiro não encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable int id){
        try {
            deleteObreiroService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}