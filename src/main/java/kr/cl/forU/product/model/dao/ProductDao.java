package kr.cl.forU.product.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.cl.forU.product.model.vo.Product;

@Repository
public class ProductDao {

	@Autowired
	SqlSession session;
	private String map = "productMapper.";
	
	
	/** 상품들 조회
	 * @return 조회된 상품 리스트
	 */
	public List<Product> selectProductList() {
		return session.selectList(map + "selectProductList");
	}
}
