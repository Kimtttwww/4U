package kr.cl.forU.order.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.cl.forU.order.model.service.OrderService;
import kr.cl.forU.order.model.vo.Order;

@RestController
@RequestMapping("/order") 
public class OrderController {

    @Autowired
    OrderService service;
    
    @GetMapping("/history")
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/orderdetail/{orderNo}")
    public Order getOrderById(@PathVariable int orderNo) {
        return service.getOrderById(orderNo);
    }
}
