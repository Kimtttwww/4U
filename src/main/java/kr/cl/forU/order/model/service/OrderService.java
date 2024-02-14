package kr.cl.forU.order.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.order.model.dao.OrderDao;

@Service
public class OrderService {

	@Autowired
	OrderDao dao;
}
