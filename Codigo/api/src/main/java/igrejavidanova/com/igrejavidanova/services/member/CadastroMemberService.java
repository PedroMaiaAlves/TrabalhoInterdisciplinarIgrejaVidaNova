package igrejavidanova.com.igrejavidanova.services.member;

import igrejavidanova.com.igrejavidanova.dto.member.MemberDTO;
import igrejavidanova.com.igrejavidanova.dto.member.ShowMemberDTO;
import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.enums.MemberType;
import igrejavidanova.com.igrejavidanova.repository.MemberRepository;
import igrejavidanova.com.igrejavidanova.security.SecurityConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CadastroMemberService {

    private final MemberRepository memberRepository;
    private final SecurityConfig securityConfig;

    public ShowMemberDTO cadastrar(MemberDTO memberDTO) {
        String senhaCripto = securityConfig.passwordEncoder().encode(memberDTO.getPassword());
        MemberEntity memberEntity = builderMemberEntity(memberDTO, senhaCripto);
        memberRepository.save(memberEntity);
        memberDTO.setId(memberEntity.getId());
        return retorno(memberDTO);
    }

    private ShowMemberDTO retorno(MemberDTO memberDTO) {
        return ShowMemberDTO.builder()
                .id(memberDTO.getId())
                .fullName(memberDTO.getFullName())
                .email(memberDTO.getEmail())
                .username(memberDTO.getUsername())
                .birthday(memberDTO.getBirthday())
                .memberType(memberDTO.getMemberType())
                .build();
    }

    private MemberEntity builderMemberEntity(MemberDTO memberDTO, String senhaCripto) {
        return MemberEntity.builder()
                .fullName(memberDTO.getFullName())
                .email(memberDTO.getEmail())
                .username(memberDTO.getUsername())
                .birthday(memberDTO.getBirthday())
                .password(senhaCripto)
                .memberType(MemberType.MEMBRO)
                .build();
    }
}
