package igrejavidanova.com.igrejavidanova.services.obreiros;

import igrejavidanova.com.igrejavidanova.entities.MemberEntity;
import igrejavidanova.com.igrejavidanova.enums.MemberType;
import igrejavidanova.com.igrejavidanova.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteObreiroService {

    private final MemberRepository memberRepository;

    public void delete(int id) {
        MemberEntity member = memberRepository.getReferenceById(id);
        member.setMemberType(MemberType.MEMBRO);
        memberRepository.save(member);
    }

}
