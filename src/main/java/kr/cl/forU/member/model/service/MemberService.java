package kr.cl.forU.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.member.model.dao.MemberDao;
import kr.cl.forU.member.model.vo.Member;

@Service
public class MemberService {

	@Autowired
	private MemberDao dao;
	
	
	public Member selectMemberSoft(Member m) {
		return dao.selectMemberSoft(m);
	}

	public int insertMember(Member m) {
		return dao.insertMember(m);
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


	
}
