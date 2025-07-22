package igrejavidanova.com.igrejavidanova.dto.member;

import igrejavidanova.com.igrejavidanova.enums.MemberType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDTO {
    private int id;
    private String fullName;
    private String email;
    private String username;
    private String password;
    private LocalDate birthday;
    private MemberType memberType;
}

