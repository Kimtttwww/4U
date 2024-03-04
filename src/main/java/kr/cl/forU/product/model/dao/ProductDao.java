package kr.cl.forU.product.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.cl.forU.product.model.vo.Palette;
import kr.cl.forU.product.model.vo.Image;
import kr.cl.forU.product.model.vo.CategoryMain;
import kr.cl.forU.product.model.vo.CategorySub;
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

	public List<Image> selectProdImageList(int prodNo) {
		return session.selectList(map + "selectProdImageList", prodNo);
	}
	
	/**
     * 리뷰 작성 자격 확인
     * @param m 상품번호(prodNo)와 회원번호(memberNo)가 필요, 없으면 기본값 0
     * @return 해당 회원이 특정 상품을 구매 했었는지 여부
     */
	public boolean reviewerCheck(Map<String, Integer> m) {
		return (int) session.selectOne(map + "reviewerCheck", m) > 0;
	}

	public List<Palette> selectColors() {
		return session.selectList("productMapper.selectColors");
	}

	/**
     * 리뷰 작성
     * @param r 사용자가 작성한 리뷰
     * @return 등록 성공 여부
     */
	public boolean insertReview(Review r) {
		return session.insert(map + "insertReview", r) > 0;
	}
	/**
	 * 
	 * 필터링 select
	 * @return
	 */
	public List<CategoryMain> selectCateMainList() {
		
		return session.selectList(map + "selectCateMainList");
	}

	public List<CategorySub> selectCateSubList() {
		
		return session.selectList(map + "selectCateSubList");
	}

	public List<Palette> selectColorList() {
		
		return session.selectList(map + "selectColorList");
	}

	public List<String> selectseeThroughList() {
		
		return session.selectList(map + "selectseeThroughList");
		
	}

	public boolean updateReview(Review r) {
		return session.update(map + "updateReview", r) > 0;
	}

	public boolean deleteReview(int reviewNo) {
		return session.update(map + "deleteReview", reviewNo) > 0;
	}
	
	
	

	
}
