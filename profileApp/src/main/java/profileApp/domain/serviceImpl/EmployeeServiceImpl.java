package profileApp.domain.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import profileApp.domain.entity.EmployeeInfo;
import profileApp.domain.service.EmployeeService;
import profileApp.repository.EmployeeInfoRepository;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeInfoRepository employeeInfoRepository;

	@Override
	public Optional<EmployeeInfo> loginService(EmployeeInfo employeeInfo) {
		String employeeId = employeeInfo.getEmployeeId();
		String password = employeeInfo.getPassword();
		Optional<EmployeeInfo> result = employeeInfoRepository.findByEmployeeIdAndPassword(employeeId, password);
		return result;
	}

	@Override
	public List<EmployeeInfo> getEmployeeInfoListService() {
		List<EmployeeInfo> result = employeeInfoRepository.findAll();
		List<EmployeeInfo> ascResult = result.stream()
				.sorted((s1, s2) -> s1.getEmployeeNumber() - s2.getEmployeeNumber()).collect(Collectors.toList());
		return ascResult;
	}

	@Override
	public Optional<EmployeeInfo> getEmployeeInfoService(Integer employeeNumber) {
		Optional<EmployeeInfo> result = employeeInfoRepository.findByEmployeeNumber(employeeNumber);
		return result;
	}

	@Override
	public boolean registerService(EmployeeInfo employeeInfo) {
		EmployeeInfo result = employeeInfoRepository.save(employeeInfo);

		return result != null;
	}

	@Override
	public boolean deleteService(EmployeeInfo employeeInfo) {
		int result = employeeInfoRepository.deleteByEmployeeNumber(employeeInfo.getEmployeeNumber());

		return result != 0;
	}

	@Override
	public boolean updatePasswordService(EmployeeInfo employeeInfo) {
		int result = employeeInfoRepository.updatePasswordByEmployeeNumber(employeeInfo.getEmployeeNumber(),
				employeeInfo.getPassword());
		return result != 0;
	}

	@Override
	public boolean updateProfileService(EmployeeInfo EmployeeInfo) {
		int result = 0;
		if (EmployeeInfo.getImage() != null) {
			result = employeeInfoRepository.updateByEmployeeNumber(EmployeeInfo.getEmployeeNumber(),
					EmployeeInfo.getEmployeeName(), EmployeeInfo.getEmployeeFullName(), EmployeeInfo.getHobbies(),
					EmployeeInfo.getImage());
		} else {
			result = employeeInfoRepository.updateNotImageByEmployeeNumber(EmployeeInfo.getEmployeeNumber(),
					EmployeeInfo.getEmployeeName(), EmployeeInfo.getEmployeeFullName(), EmployeeInfo.getHobbies());
		}
		return result != 0;
	}

}
