package kr.cl.forU.product.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.product.model.dao.ProductDao;
import kr.cl.forU.product.model.vo.Product;

@Service
public class ProductService {

	@Autowired
	ProductDao dao;

	public static Product getProductById(Product product) {
		// TODO Auto-generated method stub
		return null;
	}


	public static Product getProductById(int prodNo) {
		// TODO Auto-generated method stub
		return null;
	}
}
