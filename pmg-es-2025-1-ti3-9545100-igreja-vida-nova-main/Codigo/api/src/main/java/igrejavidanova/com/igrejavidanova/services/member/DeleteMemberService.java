package igrejavidanova.com.igrejavidanova.services.member;

import igrejavidanova.com.igrejavidanova.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteMemberService {

    private final MemberRepository memberRepository;

    public void delete(int id) {
        memberRepository.deleteById(id);
    }

}
