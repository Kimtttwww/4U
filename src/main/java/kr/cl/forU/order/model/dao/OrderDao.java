package kr.cl.forU.order.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.cl.forU.member.model.vo.CouponUser;
import kr.cl.forU.order.model.vo.Order;
import kr.cl.forU.order.model.vo.RecentOrders;
import kr.cl.forU.product.model.vo.CategoryMain;
import kr.cl.forU.product.model.vo.CategorySub;

import kr.cl.forU.order.model.vo.OrderProd;


@Repository
public class OrderDao {

	@Autowired
	SqlSession session;
	
	
	public List<Order> findAll(int memberNo) {
        return session.selectList("orderMapper.findAll", memberNo);
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
	
	public int insertOrder(Order order) {
		return session.insert("orderMapper.insertOrder", order);
	}

	public int selectOrderNo() {
		return session.selectOne("orderMapper.selectOrderNo");
	}

	public int insertOrderProd(OrderProd orderProd) {
		return session.insert("orderMapper.insertOrderProd", orderProd);
	}

	public int updateCouponUser(CouponUser coupon) {
		return session.update("orderMapper.updateCouponUser", coupon);
	}

	public int selectUserTotalPay(int memberNo) {
		return session.selectOne("orderMapper.selectUserTotalPay", memberNo);
	}

	public int insertOrderNotice() {
		return session.insert("orderMapper.insertOrderNotice");
	}

	public List<Order> selectOgOrder(int memberNo) {
		return session.selectList("orderMapper.selectOgOrder", memberNo);
	}

	public List<Order> selectAllOrder() {
		return session.selectList("orderMapper.selectAllOrder");
	}


	
	

}
