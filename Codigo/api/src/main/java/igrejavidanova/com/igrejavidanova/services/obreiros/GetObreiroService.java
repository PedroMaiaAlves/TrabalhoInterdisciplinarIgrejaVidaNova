package igrejavidanova.com.igrejavidanova.services.obreiros;

import igrejavidanova.com.igrejavidanova.dto.member.MemberDTO;
import igrejavidanova.com.igrejavidanova.dto.member.ShowMemberDTO;
import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.enums.MemberType;
import igrejavidanova.com.igrejavidanova.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetObreiroService {

    private final MemberRepository memberRepository;

    public List<ShowMemberDTO> getAll() {
        List<MemberEntity> obreiroList = memberRepository.findAllByMemberType(MemberType.OBREIRO);

        return obreiroList.stream()
                .map(this::buildObreiroDTO)
                .toList();
    }

    private ShowMemberDTO buildObreiroDTO(MemberEntity memberEntity) {
        return ShowMemberDTO.builder()
                .id(memberEntity.getId())
                .fullName(memberEntity.getFullName())
                .email(memberEntity.getEmail())
                .username(memberEntity.getUsername())
                .birthday(memberEntity.getBirthday())
                .memberType(memberEntity.getMemberType())
                .build();
    }

}
