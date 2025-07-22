package igrejavidanova.com.igrejavidanova.dto.member;

import igrejavidanova.com.igrejavidanova.enums.MemberType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowMemberDTO {
    private int id;
    private String fullName;
    private String email;
    private String username;
    private LocalDate birthday;
    private MemberType memberType;
}
