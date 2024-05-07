package profileApp.controller.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * 社員情報登録DTO
 */
@Getter
@Setter
public class RegisterDto {
	Integer employeeNumber;
	String employeeId;
	String password;
	Integer isAdmin;

}
