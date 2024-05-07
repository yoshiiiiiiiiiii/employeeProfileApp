package profileApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import profileApp.domain.entity.EmployeeInfo;

/**
 * 社員情報更新用リポジトリ
 */
public interface EmployeeInfoRepository extends JpaRepository<EmployeeInfo, Long> {

	/**
	 * ログイン情報検索
	 * 
	 * @param employeeId:社員ID
	 * @param password:パスワード
	 * @return 検索結果
	 */
	Optional<EmployeeInfo> findByEmployeeIdAndPassword(String employeeId, String password);

	/**
	 * 社員情報削除
	 * 
	 * @param employeeNumber:社員番号
	 * @return 削除結果
	 */
	@Modifying
	@Query("DELETE FROM EmployeeInfo e WHERE e.employeeNumber = :employeeNumber")
	public int deleteByEmployeeNumber(@Param("employeeNumber") Integer employeeNumber);

	/**
	 * パスワード更新
	 * 
	 * @param employeeNumber:社員番号
	 * @param password:パスワード
	 * @return 更新結果
	 */
	@Modifying
	@Query("UPDATE EmployeeInfo e SET e.password = :password WHERE e.employeeNumber = :employeeNumber")
	public int updatePasswordByEmployeeNumber(@Param("employeeNumber") Integer employeeNumber,
			@Param("password") String password);
	
	/**
	 * 社員情報取得
	 * 
	 * @param employeeNumber:社員番号
	 * @return 取得結果
	 */
	public Optional<EmployeeInfo> findByEmployeeNumber(Integer employeeNumber);

	/**
	 * 社員情報更新（画像あり）
	 * 
	 * @param employeeNumber:社員番号
	 * @param employeeName:ニックネーム
	 * @param employeeFullName:フルネーム
	 * @param hobbies:趣味
	 * @param image:画像
	 * @return 更新結果
	 */
	@Modifying
	@Query("UPDATE EmployeeInfo e SET e.employeeName = :employeeName, e.employeeFullName = :employeeFullName, e.hobbies = :hobbies, e.image = :image WHERE e.employeeNumber = :employeeNumber")
	public int updateByEmployeeNumber(@Param("employeeNumber") Integer employeeNumber,
			@Param("employeeName") String employeeName, @Param("employeeFullName") String employeeFullName,
			@Param("hobbies") String hobbies, @Param("image") byte[] image);

	/**
	 * 社員情報更新（画像なし）
	 * 
	 * @param employeeNumber:社員番号
	 * @param employeeName:ニックネーム
	 * @param employeeFullName:フルネーム
	 * @param hobbies:趣味
	 * @return 更新結果
	 */
	@Modifying
	@Query("UPDATE EmployeeInfo e SET e.employeeName = :employeeName, e.employeeFullName = :employeeFullName, e.hobbies = :hobbies WHERE e.employeeNumber = :employeeNumber")
	public int updateNotImageByEmployeeNumber(@Param("employeeNumber") Integer employeeNumber,
			@Param("employeeName") String employeeName, @Param("employeeFullName") String employeeFullName,
			@Param("hobbies") String hobbies);

}
