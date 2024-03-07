package kr.cl.forU.member.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.cl.forU.member.model.vo.Grade;
import kr.cl.forU.member.model.vo.Member;

@Repository
public class MemberDao {

	@Autowired
	private SqlSession session;
	private String map = "memberMapper.";


	public int insertMember(Member m) {
		return session.insert(map + "insertMember", m);
	}
	
	public int updateMember(Member m) {
	 
		return session.update(map + "updateMember", m);
	}
	
	public Member MemberIdMatch(String memberId) {
		return session.selectOne(map + "MemberIdMatch" , memberId);
	}

	public Member selectMemberInfo(int memberNo) {
		return session.selectOne(map + "selectMemberInfo", memberNo);
	}

	public int updateMemberPoint(Member m) {
		return session.update(map + "updateMemberPoint", m);
	}

	public int updateMemberGrade(Member m) {
		// TODO Auto-generated method stub
		return session.update(map + "updateMemberGrade", m);
	}

	public int selectPointRate(int memberNo) {
		return session.selectOne(map + "selectPointRate", memberNo);
	}

	/**
	 * 회원등급 목록 조회
	 * @return 회원 목록
	 */
	public List<Grade> selectGradeList() {
		return session.selectList(map + "selectGradeList");
	}

	/**
	 * 알림 생성
	 * @param noticeType 알림의 종류(notice 객체 참고)
	 * @param refNo 알림 대상(사용자 번호, 상품번호)
	 * @return 알림 생성 여부
	 */
	public boolean insertNotice(Map<String, Integer> m) {
		return session.insert(map + "insertNotice", m) > 0;
	}






}
