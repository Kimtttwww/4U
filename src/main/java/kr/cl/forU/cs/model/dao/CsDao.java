package kr.cl.forU.cs.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.cl.forU.cs.model.vo.QNA;

@Repository
public class CsDao {

	@Autowired
	SqlSession session;
	private String map = "csMapper.";

	public List<QNA> findQnaList() {
		return session.selectList(map + "findQnaList");
	}

	public int addAnswer(QNA newAnswer) {
		return session.update(map + "addAnswer", newAnswer);
	}

	public int newQna(QNA newQna) {
		return session.insert(map + "newQna", newQna);
	}
}
