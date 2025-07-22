package igrejavidanova.com.igrejavidanova.services.member;

import igrejavidanova.com.igrejavidanova.dto.member.ShowMemberDTO;
import igrejavidanova.com.igrejavidanova.dto.member.UpdateMemberDTO;
import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.enums.MemberType;
import igrejavidanova.com.igrejavidanova.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UpdateMemberService {

    private final MemberRepository memberRepository;

    public ShowMemberDTO update(UpdateMemberDTO updateMemberDTO, int id) {
        Optional<MemberEntity> member = memberRepository.findById(id);
        if (member.isEmpty()) {
            throw new EntityNotFoundException("Membro não encontrado");
        }
        MemberEntity updatedMember = builderNewMember(updateMemberDTO, member.get());
        memberRepository.save(updatedMember);
        return retorno(updatedMember);
    }

    private ShowMemberDTO retorno(MemberEntity member){
        return ShowMemberDTO.builder()
                .id(member.getId())
                .email(member.getEmail())
                .fullName(member.getFullName())
                .username(member.getUsername())
                .birthday(member.getBirthday())
                .memberType(member.getMemberType())
                .build();
    }

    public void promoverParaObreiro(int id) {
        MemberEntity member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membro não encontrado"));

        member.setMemberType(MemberType.OBREIRO);
        memberRepository.save(member);
    }

    private MemberEntity builderNewMember(UpdateMemberDTO updateMemberDTO, MemberEntity memberEntity) {
        return MemberEntity.builder()
                .id(memberEntity.getId())
                .fullName(updateMemberDTO.getFullName())
                .email(memberEntity.getEmail())
                .username(updateMemberDTO.getUsername())
                .birthday(updateMemberDTO.getBirthday())
                .password(memberEntity.getPassword())
                .memberType(memberEntity.getMemberType())
                .build();
    }

    public void inserirImagem(MultipartFile file, int id){
        MemberEntity membro = memberRepository.getReferenceById(id);
        try {
            membro.setFoto(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Erro ao processar a imagem: " + e.getMessage());
        }
        memberRepository.save(membro);
    }
}
