package kr.cl.forU.order.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.member.model.vo.CouponUser;
import kr.cl.forU.order.model.dao.OrderDao;
import kr.cl.forU.order.model.vo.Order;
import kr.cl.forU.order.model.vo.RecentOrders;
import kr.cl.forU.order.model.vo.OrderProd;
import kr.cl.forU.product.model.vo.CategoryMain;
import kr.cl.forU.product.model.vo.CategorySub;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
public class OrderService {

	@Autowired
	OrderDao dao;
	

    public List<Order> getAllOrders(int memberNo) {
    	return dao.findAll(memberNo);
    }

    public Order getOrderById(int orderNo) {
        return dao.findById(orderNo);
    }



	public List<CategoryMain> selectMainCate() {
		return dao.selectMainCate();
	}

	public List<CategorySub> selectSubCate(int cateMainNum) {
		return dao.selectSubCate(cateMainNum);
	}

	public List<CouponUser> selectUserCoupon(int memberNo) {
		return dao.selectUserCoupon(memberNo);
	}

	public List<RecentOrders> selectRecentOrders(String orderDate) {
		return dao.selectRecentOrders(orderDate);
	}
	
	public int insertOrder(Order order) {
		return dao.insertOrder(order);
	}

	public int selectOrderNo() {
		return dao.selectOrderNo();
	}

	public int insertOrderProd(OrderProd orderProd) {
		
		int result = dao.insertOrderProd(orderProd);
		if(result > 0) {
			dao.insertOrderNotice();
			log.info("dao.insertOrderNotice() 성공? {}", dao.insertOrderNotice());
			return result;
		}else {
			log.info("dao.insertOrderNotice()  실패");
			return 0; 
		}
	}

	public int updateCouponUser(CouponUser coupon) {
		return dao.updateCouponUser(coupon);
	}

	public int selectUserTotalPay(int memberNo) {
		return dao.selectUserTotalPay(memberNo);
	}

	public List<Order> selectOgOrder(int memberNo) {
		return dao.selectOgOrder(memberNo);
	}

	public List<Order> selectAllOrder() {
		return dao.selectAllOrder();
	}

//	public int insertOrderNotice() {
//		return dao.insertOrderNotice();
//	}


	
}
