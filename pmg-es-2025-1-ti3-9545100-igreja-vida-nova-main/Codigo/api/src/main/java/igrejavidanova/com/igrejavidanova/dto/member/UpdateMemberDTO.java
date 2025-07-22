package igrejavidanova.com.igrejavidanova.dto.member;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMemberDTO {
    private int id;
    @NotBlank
    private String fullName;
    @NotBlank
    private String username;
    @NotNull
    private LocalDate birthday;
}