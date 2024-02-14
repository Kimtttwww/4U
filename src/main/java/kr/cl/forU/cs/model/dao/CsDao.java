package kr.cl.forU.cs.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CsDao {

	@Autowired
	SqlSession session;
	private String map = "csMapper.";
}
