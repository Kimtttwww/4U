package kr.cl.forU.order.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.cl.forU.member.model.vo.CouponUser;
import kr.cl.forU.member.model.vo.Member;
import kr.cl.forU.order.model.vo.Order;
import kr.cl.forU.order.model.vo.RecentOrders;
import kr.cl.forU.product.model.vo.CategoryMain;
import kr.cl.forU.product.model.vo.CategorySub;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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


	public List<CategoryMain> selectMainCate() {
		return session.selectList("orderMapper.selectMainCate");
	}

	public List<CategorySub> selectSubCate(int cateMainNum) {
		return session.selectList("orderMapper.selectSubCate", cateMainNum);
	}

	public List<CouponUser> selectUserCoupon(int memberNo) {
		return session.selectList("orderMapper.selectUserCoupon", memberNo);
	}

	public List<RecentOrders> selectRecentOrders(String orderDate) {
		return session.selectList("orderMapper.selectRecentOrders", orderDate);
	}

	
	

}
