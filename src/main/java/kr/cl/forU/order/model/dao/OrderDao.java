package kr.cl.forU.order.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.cl.forU.member.model.vo.Member;
import kr.cl.forU.order.model.vo.Order;

@Repository
public class OrderDao {

	@Autowired
	SqlSession session;
	
	public List<Order> findAll() {
        return session.selectList("orderMapper.findAll");
    }

    public Order findById(int orderNo) {
        return session.selectOne("orderMapper.findById", orderNo);
    }

	public Member selectOrdererInfo(Member memberNo) {
		return session.selectOne("orderMapper.selectOrdererInfo", memberNo);
	}


}
