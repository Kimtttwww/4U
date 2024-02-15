package kr.cl.forU.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import jakarta.servlet.http.HttpServletResponse;
import kr.cl.forU.member.model.service.MemberService;
import kr.cl.forU.member.model.vo.Member;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/member")
@SessionAttributes({"loginMember"})
public class MemberController {

	@Autowired
	private MemberService service;
	
	
	/** 로그인 팝업창 로그인 요청
	 * @param m 로그인 시도할 ID, PW 정보
	 */
	@PostMapping("/login")
	public Member selectMemberSoft(@RequestBody Member m) {
		log.info("\nm = {}", m);
		Member loginMember = service.selectMemberSoft(m);
		log.info("\nm = {}\nloginMember = {}", m, loginMember);
		
		return loginMember;
	}
	
	@CrossOrigin(origins = "https://localhost:")
	@PostMapping("/SignUp")
	public Map<String, Object> insertMember(@RequestBody Member m , HttpServletResponse res) {
		log.info("dd {}" , m);
		int result = service.insertMember(m);
		Map<String, Object> map = new HashMap();
		
		
		if(result > 0) {
			map.put("msg", "회원가입 성공");
		} else {
			map.put("msg", "메뉴 등록 실패");
		}
		return map;
	}

	
}
