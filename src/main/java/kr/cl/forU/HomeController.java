package kr.cl.forU;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {

	@GetMapping("/")
	public String callMainPage() {
		return "index";
	}
	
}
