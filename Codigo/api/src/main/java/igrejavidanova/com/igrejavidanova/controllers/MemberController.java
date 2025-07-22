package igrejavidanova.com.igrejavidanova.controllers;

import java.util.*;

import igrejavidanova.com.igrejavidanova.dto.member.MemberDTO;
import igrejavidanova.com.igrejavidanova.dto.member.ShowMemberDTO;
import igrejavidanova.com.igrejavidanova.dto.member.UpdateMemberDTO;
import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.services.member.CadastroMemberService;
import igrejavidanova.com.igrejavidanova.services.member.DeleteMemberService;
import igrejavidanova.com.igrejavidanova.services.member.GetMemberService;
import igrejavidanova.com.igrejavidanova.services.member.UpdateMemberService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.concurrent.TimeUnit;


@RestController
@RequestMapping("/membros")
@RequiredArgsConstructor
public class MemberController {

    private final CadastroMemberService cadastroMemberService;
    private final GetMemberService getMemberService;
    private final UpdateMemberService updateMemberService;
    private final DeleteMemberService deleteMemberService;
    
    @PostMapping("/cadastrar")
    public ResponseEntity<Object> cadastrar(@RequestBody @Valid MemberDTO memberDTO, UriComponentsBuilder uriBuilder){
        try {
            URI uri = uriBuilder.path("/membros/{id}").buildAndExpand(memberDTO.getId()).toUri();
            return ResponseEntity.created(uri).body(cadastroMemberService.cadastrar(memberDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<?> getAll(){
        try{
            List<MemberEntity> membros = getMemberService.getAllMembers();

            List<ShowMemberDTO> memberDtoList = new ArrayList<>();

            membros.forEach(member->
                memberDtoList.add(ShowMemberDTO.builder()
                        .id(member.getId())
                        .fullName(member.getFullName())
                        .email(member.getEmail())
                        .username(member.getUsername())
                        .birthday(member.getBirthday())
                        .memberType(member.getMemberType())
                        .build()
                )
            );

            return ResponseEntity.ok(memberDtoList);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Membros não encontrado");
        }
    }

    @GetMapping("/buscarPorId/{id}")
    public ResponseEntity<Object> visualizar(@PathVariable int id) {
        try {
            MemberEntity memberEntity = getMemberService.get(id);

            MemberDTO memberDTO = MemberDTO.builder()
                    .id(memberEntity.getId())
                    .fullName(memberEntity.getFullName())
                    .email(memberEntity.getEmail())
                    .username(memberEntity.getUsername())
                    .birthday(memberEntity.getBirthday())
                    .password(memberEntity.getPassword())
                    .memberType(memberEntity.getMemberType())
                    .build();
            return ResponseEntity.ok(memberDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Membro não encontrado");
        }
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Object> atualizar(@RequestBody @Valid UpdateMemberDTO updateMemberDTO, @PathVariable int id){
        try {
            return ResponseEntity.ok(updateMemberService.update(updateMemberDTO, id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dados Incorretos");
        }
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable int id){
        deleteMemberService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/name")
    public ResponseEntity<Object> getForName(@RequestParam String fullName, @RequestParam String username){
        try {
            return ResponseEntity.ok(getMemberService.getByFullNameAndUsername(fullName, username));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Membro não encontrado");
        }
    }

    @PutMapping("/promoverObreiro/{id}")
    public ResponseEntity<Object> promoverObreiro(@PathVariable int id){
        try {
            updateMemberService.promoverParaObreiro(id);
            return ResponseEntity.ok().build(); 
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Membro não encontrado")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Membro não encontrado");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno: " + e.getMessage());
            }
        }
    }

    @GetMapping("/listar/aniversariantesDoMes")
    public ResponseEntity<Object> listarAniversariantesDoMes(){
        try {
            return ResponseEntity.ok(getMemberService.getAniversariantesDoMes());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum membro encontrado");
        }
    }

    @PatchMapping("/inserirFoto/{id}")
    public ResponseEntity<String> saveImage(MultipartFile file, @PathVariable int id) {
        try {
            if (file == null || file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body("Arquivo de imagem não fornecido ou vazio");
            }

            if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
                return ResponseEntity.badRequest().body("Apenas arquivos de imagem são permitidos");
            }

            updateMemberService.inserirImagem(file, id);
            return ResponseEntity.ok().body("Imagem atualizada com sucesso");

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Membro não encontrado com ID: " + id);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro inesperado: " + e.getMessage());
        }
    }

    @GetMapping("/obterImagem/{id}")
    public ResponseEntity<?> getMemberImage(@PathVariable int id) {
        try {
            byte[] imageData = getMemberService.getMemberImage(id);

            if (imageData == null || imageData.length == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Imagem não encontrada para o membro " + id);
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageData);

        } catch (Exception e) {
            e.printStackTrace(); // Isso aparecerá nos logs
            return ResponseEntity.internalServerError()
                    .body("Erro ao recuperar imagem: " + e.getMessage());
        }
    }
}