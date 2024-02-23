package kr.cl.forU.cs.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import kr.cl.forU.cs.model.vo.QNA;

@Repository
public class CsDao {

	@Autowired
	SqlSession session;
	private String map = "csMapper.";
	
	public Page<QNA> findQnaList(Page<QNA> qnaPage) {
		return session.selectList(map + "findQnaList" , qnaPage);
	}
}
