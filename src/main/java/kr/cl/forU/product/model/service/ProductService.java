package kr.cl.forU.product.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.product.model.dao.ProductDao;

@Service
public class ProductService {

	@Autowired
	ProductDao dao;
}
