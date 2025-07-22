package igrejavidanova.com.igrejavidanova.services.member;

import igrejavidanova.com.igrejavidanova.dto.member.UpdateMemberDTO;
import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.enums.MemberType;
import igrejavidanova.com.igrejavidanova.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetMemberService {

    private final MemberRepository memberRepository;

    public MemberEntity get(int id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Membro não encontrado com ID: " + id));
    }

    public List<MemberEntity> getAllMembers(){
        return memberRepository.findAllByMemberType(MemberType.MEMBRO);
    }

    public Optional<MemberEntity> getByFullNameAndUsername(String fullName, String username) {
        return memberRepository.findByFullNameAndUsername(fullName, username);
    }

    public List<UpdateMemberDTO> getAniversariantesDoMes() {
        int mes = java.time.LocalDate.now().getMonthValue();
        List<UpdateMemberDTO> memberDTOList = new ArrayList<>(); //Reaproveitei o dto para nao ficar valores nulls, mas ela faz a mesma coisa
        memberRepository.findByBirthdayMonth(mes)
                .forEach(
                    memberEntity -> memberDTOList.add(UpdateMemberDTO.builder()
                            .id(memberEntity.getId())
                            .fullName(memberEntity.getFullName())
                            .username(memberEntity.getUsername())
                            .birthday(memberEntity.getBirthday())
                            .build())
                );
        return memberDTOList;
    }

    public byte[] getMemberImage(int memberId) {
        MemberEntity member = memberRepository.getReferenceById(memberId);

        if (member.getFoto() == null || member.getFoto().length == 0) {
            return getDefaultImage();
        }

        return member.getFoto();
    }

    private byte[] getDefaultImage() {
        try {
            ClassPathResource imgFile = new ClassPathResource("static/images/default-avatar.png");
            return StreamUtils.copyToByteArray(imgFile.getInputStream());
        } catch (IOException e) {
            return new byte[0];
        }
    }
}
