package kr.cl.forU.order.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.member.model.vo.CouponUser;
import kr.cl.forU.order.model.dao.OrderDao;
import kr.cl.forU.order.model.vo.Order;
import kr.cl.forU.order.model.vo.OrderProd;
import kr.cl.forU.product.model.vo.CategoryMain;
import kr.cl.forU.product.model.vo.CategorySub;



@Service
public class OrderService {

	@Autowired
	OrderDao dao;
	

    public List<Order> getAllOrders() {
        return dao.findAll();
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

	public int insertOrder(Order order) {
		return dao.insertOrder(order);
	}

	public int selectOrderNo() {
		return dao.selectOrderNo();
	}

	public int insertOrderProd(OrderProd orderProd) {
		return dao.insertOrderProd(orderProd);
	}

	public int updateCouponUser(CouponUser coupon) {
		return dao.updateCouponUser(coupon);
	}

	public int selectUserTotalPay(int memberNo) {
		return dao.selectUserTotalPay(memberNo);
	}

	public int insertOrderNotice() {
		return dao.insertOrderNotice();
	}


	
}
