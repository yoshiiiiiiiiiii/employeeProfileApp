package profileApp.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import profileApp.domain.entity.EmployeeInfo;

@Service
@Transactional
public interface EmployeeService {

	/**
	 * ログイン情報検索サービス
	 * 
	 * @param employee:ログイン情報
	 * @return 検索判定結果
	 */
	public Optional<EmployeeInfo> loginService(EmployeeInfo employeeInfo);

	/**
	 * 社員情報リスト取得サービス
	 * 
	 * @return 社員情報リスト
	 */
	public List<EmployeeInfo> getEmployeeInfoListService();

	/**
	 * 社員情報取得サービス
	 * 
	 * @param employeeNumber:社員番号
	 * @return 社員情報
	 */
	public Optional<EmployeeInfo> getEmployeeInfoService(Integer employeeNumber);

	/**
	 * 社員情報登録サービス
	 * 
	 * @param employeeInfo:社員登録情報
	 * @return 登録判定結果
	 */
	public boolean registerService(EmployeeInfo employeeInfo);

	/**
	 * 社員情報削除サービス
	 * 
	 * @param employeeInfo:社員削除情報
	 * @return 削除判定結果
	 */
	public boolean deleteService(EmployeeInfo employeeInfo);

	/**
	 * パスワード更新サービス
	 * 
	 * @param employeeInfo:社員情報
	 * @return 更新判定結果
	 */
	public boolean updatePasswordService(EmployeeInfo employeeInfo);

	/**
	 * 社員情報更新サービス
	 * 
	 * @param employeeInfo:社員情報
	 * @return 更新判定結果
	 */
	public boolean updateProfileService(EmployeeInfo employeeInfo);

}
