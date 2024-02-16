package kr.cl.forU.product.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.product.model.dao.ProductDao;
import kr.cl.forU.product.model.vo.Product;

@Service
public class ProductService {

	@Autowired
	ProductDao dao;

	public Product getProductById(Product product) {
		// TODO Auto-generated method stub
		return null;
	}


	public Product getProductById(int prodNo) {
		// TODO Auto-generated method stub
		return null;
	}


	/** 상품들 조회
	 * @return 조회된 상품 리스트
	 */
	public List<Product> selectProductList() {
		return dao.selectProductList();
	}
}
