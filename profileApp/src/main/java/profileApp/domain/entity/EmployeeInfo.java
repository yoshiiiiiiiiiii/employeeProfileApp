package profileApp.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import profileApp.common.Enum.Admin;

/**
 * 社員情報エンティティ
 */
@Entity
@Getter
@Setter
public class EmployeeInfo {
	/**
	 * 社員番号
	 */
	@Id
	private Integer employeeNumber;

	/**
	 * 社員ID
	 */
	private String employeeId;

	/**
	 * ニックネーム
	 */
	private String employeeName;

	/**
	 * フルネーム
	 */
	private String employeeFullName;

	/**
	 * 趣味
	 */
	private String hobbies;

	/**
	 * プロフィール画像
	 */
	private byte[] image;

	/**
	 * パスワード
	 */
	private String password;

	/**
	 * 管理者Enum
	 */
	@Enumerated(EnumType.ORDINAL)
	private Admin isAdmin;
}
