package profileApp.controller.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

/**
 * プロフィール編集DTO
 */
@Getter
@Setter
public class EditProfileDto {
	MultipartFile image;
	Integer employeeNumber;
	String employeeName;
	String employeeFullName;
	String hobbies;
}
