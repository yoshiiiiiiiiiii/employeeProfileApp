package profileApp.controller;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import profileApp.common.Enum.Admin;
import profileApp.controller.dto.EditPasswordDto;
import profileApp.controller.dto.LoginDto;
import profileApp.controller.dto.RegisterDto;
import profileApp.domain.entity.EmployeeInfo;
import profileApp.domain.service.EmployeeService;

/**
 * RESTコントローラー
 */
@RestController
@RequestMapping("/api")
public class ProfileRestController {

	@Autowired
	private EmployeeService employeeService;

	/**
	 * ログイン処理
	 * 
	 * @param loginDto:ログイン情報
	 * @return ログイン検索結果(管理者判定結果付き)
	 */
	@PostMapping("/login")
	ResponseEntity<EmployeeInfo> login(@RequestBody LoginDto loginDto) {
		String employeeId = loginDto.getEmployeeId();
		String password = loginDto.getPassword();

		// パスワードをBase64で変換
		Charset charset = StandardCharsets.UTF_8;
		String encodePass = new String(Base64.getEncoder().encode(password.getBytes(charset)), charset);

		// エンティティに情報を設定
		EmployeeInfo employeeInfo = new EmployeeInfo();
		employeeInfo.setEmployeeId(employeeId);
		employeeInfo.setPassword(encodePass);

		// Dtoで受け取った情報をデータベースから検索するサービスに渡す
		Optional<EmployeeInfo> result = employeeService.loginService(employeeInfo);

		if (result.isPresent()) {
			return new ResponseEntity<>(result.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	/**
	 * 社員詳細情報リスト取得処理
	 * 
	 * @return 取得結果
	 */
	@GetMapping("/getEmployeeInfoList")
	ResponseEntity<List<EmployeeInfo>> getEmployeeList() {

		List<EmployeeInfo> result = employeeService.getEmployeeInfoListService();
		if (!result.isEmpty()) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

	}

	/**
	 * 社員詳細情報取得処理
	 * 
	 * @param employeeNumber:社員番号
	 * @return 取得結果
	 */
	@GetMapping("/getEmployeeInfo")
	ResponseEntity<EmployeeInfo> getEmployee(@RequestParam("employeeNumber") Integer employeeNumber) {

		Optional<EmployeeInfo> result = employeeService.getEmployeeInfoService(employeeNumber);
		if (result.isPresent()) {
			return new ResponseEntity<>(result.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

	}

	/**
	 * 社員情報登録処理
	 * 
	 * @param registerDto:登録情報
	 * @return 登録結果
	 * @throws IOException:画像読み込みエラー
	 */
	@PostMapping("/register")
	ResponseEntity<String> register(@RequestBody RegisterDto registerDto) throws IOException {
		Integer employeeNumber = registerDto.getEmployeeNumber();
		String employeeId = registerDto.getEmployeeId();
		String password = registerDto.getPassword();

		// 初期パスワードをBase64で変換
		Charset charset = StandardCharsets.UTF_8;
		String encodePass = new String(Base64.getEncoder().encode(password.getBytes(charset)), charset);

		// エンティティに情報を設定
		EmployeeInfo employeeInfo = new EmployeeInfo();
		employeeInfo.setEmployeeNumber(employeeNumber);
		employeeInfo.setEmployeeId(employeeId);
		employeeInfo.setEmployeeName(employeeId);
		Resource resource = new ClassPathResource("sample.png");
		Path path = Paths.get(resource.getURI());
		byte[] byteImg = Files.readAllBytes(path);
		employeeInfo.setImage(byteImg);// デフォルト画像を設定
		employeeInfo.setPassword(encodePass);
		if (Admin.ADMIN.ordinal() == registerDto.getIsAdmin()) {
			employeeInfo.setIsAdmin(Admin.ADMIN);
		} else {
			employeeInfo.setIsAdmin(Admin.NOT_ADMIN);
		}

		// Dtoで受け取った情報を登録サービスに渡す
		boolean result = employeeService.registerService(employeeInfo);

		if (result) {
			return new ResponseEntity<>("success!", HttpStatus.OK);
		}
		return new ResponseEntity<>("failed!", HttpStatus.NOT_FOUND);
	}

	/**
	 * 社員情報削除処理
	 * 
	 * @param id:削除対象社員番号
	 * @return 削除結果
	 */
	@DeleteMapping("/delete/{id}")
	ResponseEntity<String> delete(@PathVariable Integer id) {

		// エンティティに情報を設定
		EmployeeInfo employeeInfo = new EmployeeInfo();
		employeeInfo.setEmployeeNumber(id);

		// Dtoで受け取った情報を削除サービスに渡す
		boolean result = employeeService.deleteService(employeeInfo);

		if (result) {
			return new ResponseEntity<>("success!", HttpStatus.OK);
		}
		return new ResponseEntity<>("failed!", HttpStatus.NOT_FOUND);
	}

	/**
	 * パスワード再設定処理
	 * 
	 * @param editPasswordDto:パスワード情報
	 * @return 更新結果
	 */
	@PutMapping("/updatePassword")
	ResponseEntity<String> editPassword(@RequestBody EditPasswordDto editPasswordDto) {
		Integer employeeNumber = editPasswordDto.getEmployeeNumber();
		String employeeId = editPasswordDto.getEmployeeId();
		String oldPassword = editPasswordDto.getOldPassword();
		String newPassword = editPasswordDto.getNewPassword();

		// パスワードをBase64で変換
		Charset charset = StandardCharsets.UTF_8;
		String encodeOldPass = new String(Base64.getEncoder().encode(oldPassword.getBytes(charset)), charset);
		String encodeNewPass = new String(Base64.getEncoder().encode(newPassword.getBytes(charset)), charset);

		// エンティティに情報を設定
		EmployeeInfo employeeInfo = new EmployeeInfo();
		employeeInfo.setEmployeeNumber(employeeNumber);
		employeeInfo.setEmployeeId(employeeId);
		employeeInfo.setPassword(encodeOldPass);

		// Dtoで受け取った情報をデータベースから検索するサービスに渡す
		Optional<EmployeeInfo> result = employeeService.loginService(employeeInfo);

		if (result.isPresent()) {
			// 情報が存在する場合、新規パスワードを設定する
			employeeInfo.setPassword(encodeNewPass);
			boolean resultUpdatePass = employeeService.updatePasswordService(employeeInfo);
			if (resultUpdatePass) {
				return new ResponseEntity<>("success!", HttpStatus.OK);
			}
		}
		return new ResponseEntity<>("failed!", HttpStatus.NOT_FOUND);

	}

	/**
	 * プロフィール情報更新処理
	 * 
	 * @param image:プロフィール画像
	 * @param employeeNumber:社員番号
	 * @param employeeName:ニックネーム
	 * @param employeeFullName:フルネーム
	 * @param hobbies:趣味
	 * @return 更新結果
	 * @throws IOException:画像データ読み込みエラー
	 */
	@PutMapping(value = "/updateProfile", consumes = "multipart/form-data")
	ResponseEntity<String> editProfile(@RequestParam(required = false) MultipartFile image,
			@RequestParam Integer employeeNumber, @RequestParam String employeeName,
			@RequestParam String employeeFullName, @RequestParam String hobbies) throws IOException {

		// エンティティに情報を設定
		EmployeeInfo employeeInfo = new EmployeeInfo();
		employeeInfo.setEmployeeNumber(employeeNumber);
		employeeInfo.setEmployeeName(employeeName);
		employeeInfo.setEmployeeFullName(employeeFullName);
		employeeInfo.setHobbies(hobbies);
		employeeInfo.setImage(image != null ? image.getBytes() : null);

		// Dtoで受け取った情報をデータベースに更新するサービスに渡す
		boolean result = employeeService.updateProfileService(employeeInfo);

		if (result) {
			return new ResponseEntity<>("success!", HttpStatus.OK);
		}
		return new ResponseEntity<>("failed!", HttpStatus.NOT_FOUND);

	}

}
