package kr.cl.forU.product.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.product.model.dao.ProductDao;
import kr.cl.forU.product.model.vo.Product;

@Service
public class ProductService {

	@Autowired
	ProductDao dao;

    // 상품 번호를 기반으로 제품을 가져오는 메서드
    public Product getProductById(int prodNo) {
        return dao.getProductById(prodNo);
    }
    
}




