package igrejavidanova.com.igrejavidanova.controllers;

import igrejavidanova.com.igrejavidanova.dto.auth.AuthMemberDTO;
import igrejavidanova.com.igrejavidanova.services.auth.AuthMemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final AuthMemberService authMemberService;

    @PostMapping("/")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthMemberDTO authMemberDTO) {
        try {
            return ResponseEntity.ok(authMemberService.auth(authMemberDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/")
    public ResponseEntity<Object> updatePassword(@RequestBody @Valid AuthMemberDTO authMemberDTO) {
        try {
            return ResponseEntity.ok(authMemberService.updatePassword(authMemberDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
