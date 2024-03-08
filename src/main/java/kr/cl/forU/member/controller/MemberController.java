package kr.cl.forU.member.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import jakarta.servlet.http.HttpServletResponse;
import kr.cl.forU.member.model.service.MemberService;
import kr.cl.forU.member.model.vo.Grade;
import kr.cl.forU.member.model.vo.Member;
import kr.cl.forU.member.model.vo.Notice;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/member")
@SessionAttributes({"loginMember"})
public class MemberController {

	@Autowired
	private MemberService service;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@GetMapping("/notice/{memberNo}")
	public List<Notice> selectNotice(@PathVariable int memberNo) {
		return service.selectNotice(memberNo);
	}
	
	@DeleteMapping("/noticeDelete/{noticeNo}")
	public int noticeDelete(@PathVariable int noticeNo) {
		return service.noticeDelete(noticeNo);
	}
	
	@GetMapping("/selectAllMember")
	public List<Member> selectAllMember() {
		return service.selectAllMember();
	}
	
	@PutMapping("/deleteMember/{memberNo}")
	public int deleteMember(@PathVariable int memberNo) {
		return service.deleteMember(memberNo);
	}
	
	@PostMapping("/sellerUpdateMem")
	public int sellerUpdateMem(@RequestBody Member member) {
		
		String encodedPassword = passwordEncoder.encode(member.getMemberPwd());
		member.setMemberPwd(encodedPassword);
		
	    return service.sellerUpdateMem(member);
	}
	
	/** 로그인 팝업창 로그인 요청
	 * @param m 로그인 시도할 ID, PW 정보
	 * @return 해당되는 사용자의 간략한 정보
	 */
	@PostMapping("/login")
	public Member selectMemberSoft(@RequestBody Member m) {
		Member member = service.MemberIdMatch(m.getMemberId());
		
		if(member != null && passwordEncoder.matches(m.getMemberPwd(), member.getMemberPwd())) {
			member.setMemberPwd(null);
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
	@PostMapping("/editInfo")
	public Map<String, Object> updateMember(@RequestBody Member m) {
	
		log.info("\n{}",m);
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
		
		int result = service.updateMember(m);
		Map<String, Object> map = new HashMap<>();
		
		if(result > 0) {
			map.put("msg", "정보수정 성공");
		} else {
			map.put("msg", "정보수정 실패");
		}
		log.info("map로그 = {}", map);
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
	
	/**
	 * 회원등급 목록 조회
	 * @return 회원 목록
	 */
	@GetMapping("grade")
	public List<Grade> selectGradeList() {
		return service.selectGradeList();
	}
	
	
	
}
