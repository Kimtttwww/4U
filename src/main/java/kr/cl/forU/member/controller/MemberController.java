package kr.cl.forU.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
private BCryptPasswordEncoder passwordEncoder;
	
	
	@Autowired
	private MemberService service;
	
	/** 로그인 팝업창 로그인 요청
	 * @param m 로그인 시도할 ID, PW 정보
	 * @return 해당되는 사용자의 간략한 정보
	 */
	@PostMapping("/login")
	public Member selectMemberSoft(@RequestBody Member m) {
		
		Member member = service.MemberIdMatch(m.getMemberId());
		if(member != null && passwordEncoder.matches(m.getMemberPwd(), member.getMemberPwd())) {
			return member;
		}else {
			return null;
		}
		
	}
	
	@CrossOrigin(origins = "https://localhost:3000")
	@PostMapping("/SignUp")
	public Map<String, Object> insertMember(@RequestBody Member m , HttpServletResponse res) {
	
		
		String encodedPassword = passwordEncoder.encode(m.getMemberPwd());
		m.setMemberPwd(encodedPassword);
		
		
		String formatPhoneOne = (m.getPhone().substring(0,3));
		log.info("\n 전화번호 = {}", formatPhoneOne);
		String formatPhoneTwo = (m.getPhone().substring(3,7));
		log.info("\n 전화번호 = {}", formatPhoneTwo);
		String formatPhoneThree = (m.getPhone().substring(7,11));
		log.info("\n 전화번호 = {}", formatPhoneThree);
		
		String phoneFinal = (formatPhoneOne + "-" + formatPhoneTwo + "-" + formatPhoneThree);
		m.setPhone(phoneFinal);
		log.info("\n 전화번호 = {}", m.getPhone());
		
		int result = service.insertMember(m);
		Map<String, Object> map = new HashMap<>();
		
		if(result > 0) {
			map.put("msg", "회원가입 성공");
		} else {
			map.put("msg", "메뉴 등록 실패");
		}
		return map;
	}
	@CrossOrigin(origins = "https://localhost:3000")
	@PostMapping("SignUp/idCheck")
	public Member checkMemberId(@RequestBody String memberId , HttpServletResponse res) {
		
		Member member = service.MemberIdMatch(memberId);
		log.info("\nddd = {}", member);
		if (member == null) {
			
			
			return null;
			
			// 데이터 안에 없을때
			
		} else {
			
			
			return member;
			
			// 데이터 안에 있을때
		}
		
	}
	
	
	
}
