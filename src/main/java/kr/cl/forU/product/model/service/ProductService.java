package kr.cl.forU.product.model.service;

import java.util.List;
import java.util.Map;

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
    
	/** 상품들 조회
	 * @param m 
	 * @return 조회된 상품 리스트
	 */
	public List<Product> selectProductList(Map<String, String> m ) {
		return dao.selectProductList(m);
	}

	public List<Product> bestProducts() {
		
		return dao.bestProducts();
	}
}




