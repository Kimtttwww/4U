package kr.cl.forU.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import kr.cl.forU.order.model.service.OrderService;

@Controller
public class OrderController {

	@Autowired
	OrderService service;
}
