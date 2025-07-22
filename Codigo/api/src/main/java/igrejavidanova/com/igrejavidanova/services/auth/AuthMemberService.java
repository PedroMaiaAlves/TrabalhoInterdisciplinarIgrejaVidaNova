package igrejavidanova.com.igrejavidanova.services.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import igrejavidanova.com.igrejavidanova.dto.auth.AuthMemberDTO;
import igrejavidanova.com.igrejavidanova.dto.auth.AuthMemberResponseDTO;
import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.enums.MemberType;
import igrejavidanova.com.igrejavidanova.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthMemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthMemberResponseDTO auth(AuthMemberDTO authMemberDTO) throws Exception {
        MemberEntity member = memberRepository.findByEmail(authMemberDTO.getEmail())
            .orElseThrow(() -> new Exception("User not found"));

        boolean passwordMatch = passwordEncoder.matches(authMemberDTO.getPassword(), member.getPassword());
        if (!passwordMatch) {
            throw new Exception("Invalid password");
        }

        return getAuthMemberResponseDTO(member);
    }

    private AuthMemberResponseDTO getAuthMemberResponseDTO(MemberEntity member) {
        Algorithm algorithm = Algorithm.HMAC256("secret");

        String token = generateToken(member, algorithm);

        return AuthMemberResponseDTO.builder()
                .access_token(token)
                .build();
    }

    private String generateToken(MemberEntity member, Algorithm algorithm) {
        List<String> claims = getClaims(member);
        return JWT.create()
                .withIssuer("vidanova")
                .withClaim("roles", claims)
                .withClaim("userId", member.getId())
                .withClaim("email", member.getEmail())
                .withExpiresAt(Instant.now().plus(Duration.ofHours(2)))
                .sign(algorithm);
    }

    private static List<String> getClaims(MemberEntity member) {
        List<String> claims = new ArrayList<>();
        claims.add("MEMBRO");

        if (member.getMemberType() == MemberType.OBREIRO) {
            claims.add("OBREIRO");
        } else if (member.getMemberType() == MemberType.PASTOR) {
            claims.add("PASTOR");
        }

        return claims;
    }

    public String updatePassword(AuthMemberDTO authMemberDTO) throws Exception {
        MemberEntity member = memberRepository.findByEmail(authMemberDTO.getEmail())
            .orElseThrow(() -> new Exception("User not found"));

        member.setPassword(passwordEncoder.encode(authMemberDTO.getPassword()));
        memberRepository.save(member);

        return "Password updated";
    }

}
