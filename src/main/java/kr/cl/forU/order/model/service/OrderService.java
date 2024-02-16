package kr.cl.forU.order.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.member.model.vo.Member;
import kr.cl.forU.order.model.dao.OrderDao;
import kr.cl.forU.order.model.vo.Order;
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

	public Member selectOrdererInfo(int memberNo) {
		return dao.selectOrdererInfo(memberNo);
	}

	public List<CategoryMain> selectMainCate() {
		return dao.selectMainCate();
	}

	public List<CategorySub> selectSubCate(int cateMainNum) {
		return dao.selectSubCate(cateMainNum);
	}

	
}
