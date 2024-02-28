package kr.cl.forU.product.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.product.model.dao.ProductDao;
import kr.cl.forU.product.model.vo.Palette;
import kr.cl.forU.product.model.vo.ProdDetail;
import kr.cl.forU.product.model.vo.Product;
import kr.cl.forU.product.model.vo.Review;

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

	public List<Product> selectCartList(List<Integer> prodNo) {
		return dao.selectCartList(prodNo);
	}

	/**
     * 해당 상품의 리뷰들 조회
     * @param prodNo 리뷰들을 조회할 상품의 번호
	 * @return 조회된 상품 리스트
	 */
	public List<Review> selectReviewList(int prodNo) {
		return dao.selectReviewList(prodNo);
	}

	public List<Product> extractProdFromCate(HashMap<String, String> map) {
		return dao.extractProdFromCate(map);
	}

	public Product selectProdName(int prodNo) {
		return dao.selectProdName(prodNo);
	}

	public List<ProdDetail> selectProdDetailList(int prodNo) {
		return dao.selectProdDetailList(prodNo);
	}

	public List<Palette> selectColors() {
		// TODO Auto-generated method stub
		return dao.selectColors();
	}

}
