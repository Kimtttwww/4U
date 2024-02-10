package kr.cl.forU.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import kr.cl.forU.member.model.service.MemberService;
import kr.cl.forU.member.model.vo.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;


@Slf4j
@Controller
@RequestMapping("/member")
@SessionAttributes({"loginMember"})
public class MemberController {

	@Autowired
	private MemberService service;
	
	
	/** 로그인 팝업창 로그인 요청
	 * @param m 로그인 시도할 ID, PW 정보
	 */
	@PostMapping("/login")
	public void selectSoftMember(@RequestBody Member m, Model model) {
		Member loginMember = service.selectMemberSoft(m);
		log.info("\nm = {}\nloginMember = {}");
		
		if(loginMember != null) {
			model.addAttribute("loginMember", loginMember);
		}
	}
	
	@GetMapping("/login/test")
	public String loginFormReturner() {
		return "member/login";
	}
	
}
