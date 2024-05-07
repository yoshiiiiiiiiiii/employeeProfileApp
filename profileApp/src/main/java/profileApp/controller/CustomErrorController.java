package profileApp.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;

/**
 * エラー発生時の処理コントローラー
 */
@Controller
public class CustomErrorController implements ErrorController {

	private static final String PATH = "/error";

	@RequestMapping(value = PATH)
	public String error(HttpServletRequest request) {
		return "forward:/index.html";
	}

	public String getErrorPath() {
		return PATH;
	}

}
