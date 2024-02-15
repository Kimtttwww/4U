package kr.cl.forU.order.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.order.model.dao.OrderDao;
import kr.cl.forU.order.model.vo.Order;

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
}
