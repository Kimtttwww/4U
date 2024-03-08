package kr.cl.forU.member.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.member.model.dao.MemberDao;
import kr.cl.forU.member.model.vo.Grade;
import kr.cl.forU.member.model.vo.Member;
import kr.cl.forU.member.model.vo.Notice;

@Service
public class MemberService {

	@Autowired
	private MemberDao dao;
	

	public int insertMember(Member m) {
		return dao.insertMember(m);
	}
	
	public int updateMember(Member m) {
		return dao.updateMember(m);
	}
	
	public Member MemberIdMatch(String memberId) {
		return dao.MemberIdMatch(memberId);
	}

	public Member selectMemberInfo(int memberNo) {
		return dao.selectMemberInfo(memberNo);
	}

	public int updateMemberPoint(Member m) {
		return dao.updateMemberPoint(m);
	}
	
	public int updateMemberGrade(Member m){
		return dao.updateMemberGrade(m);
	}

	public int selectPointRate(int memberNo) {
		return dao.selectPointRate(memberNo);
	}

	/**
	 * 회원등급 목록 조회
	 * @return 회원 목록
	 */
	public List<Grade> selectGradeList() {
		return dao.selectGradeList();
	}

	public List<Notice> selectNotice(int memberNo) {
		return dao.selectNotice(memberNo);
	}

	public int noticeDelete(int noticeNo) {
		return dao.noticeDelete(noticeNo);
	}

	public List<Member> selectAllMember() {
		return dao.selectAllMember();
	}

	public int deleteMember(int memberNo) {
		return dao.deleteMember(memberNo);
	}

	public int sellerUpdateMem(Member member) {
		return dao.sellerUpdateMem(member);
	}


	
}
