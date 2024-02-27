package kr.cl.forU.product.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.cl.forU.product.model.vo.ProdDetail;
import kr.cl.forU.product.model.vo.Product;
import kr.cl.forU.product.model.vo.Review;

@Repository
public class ProductDao {

    @Autowired
    SqlSession session;
    private String map = "productMapper.";


    public Product getProductById(int prodNo) {
		return session.selectOne(map + "getProductById", prodNo);
    }
	
	/**
	 * 상품들 조회
	 * @return 조회된 상품 리스트
	 */
	public List<Product> selectProductList(Map<String, String> m) {
		return session.selectList(map + "selectProductList", m);
	}

	public List<Product> bestProducts() {
		return session.selectList(map + "bestProducts");
	}

	public List<Product> selectCartList(List<Integer> prodNo) {
		return session.selectList(map + "selectCartList", prodNo);
	}

	/**
     * 해당 상품의 리뷰들 조회
     * @param prodNo 리뷰들을 조회할 상품의 번호
	 * @return 조회된 상품 리스트
	 */
	public List<Review> selectReviewList(int prodNo) {
		return session.selectList(map + "selectReviewList", prodNo);
	}
	
	public List<Product> extractProdFromCate(HashMap<String, String> m) {
		return session.selectList(map + "searchByCate", m);
	}

	public Product selectProdName(int prodNo) {
		return session.selectOne(map + "selectProdName", prodNo);
	}

	public List<ProdDetail> selectProdDetailList(int prodNo) {
		return session.selectList(map + "selectProdDetailList", prodNo);
	}
	
}
