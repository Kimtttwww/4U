package kr.cl.forU.product.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.cl.forU.product.model.vo.Product;

@Repository
public class ProductDao {

    @Autowired
    SqlSession session;
    private String map = "productMapper.";


    public Product getProductById(int prodNo) {
        return session.selectOne(map + "getProductById", prodNo);
    }
	
	/** 상품들 조회
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

	public List<Product> extractProdFromCate(Integer colorNo, String size, String fabric, String lining,
			String seeThrough, String thickness) {
		
		return session.selectList(map + "searchByCate", colorNo, size, fabric, lining, seeThrough, thickness);
	}
	
}
