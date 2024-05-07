package profileApp.controller.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * パスワード再設定DTO
 */
@Getter
@Setter
public class EditPasswordDto {
	Integer employeeNumber;
	String employeeId;
	String oldPassword;
	String newPassword;

}
