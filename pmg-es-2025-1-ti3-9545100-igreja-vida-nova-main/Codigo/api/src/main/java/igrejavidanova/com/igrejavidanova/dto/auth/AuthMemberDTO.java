package igrejavidanova.com.igrejavidanova.dto.auth;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthMemberDTO {
    
    private String email;
    private String password;

}
