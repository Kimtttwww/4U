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
	public List<Product> selectProductList(Map<String, Object> m) {
		return session.selectList(map + "selectProductList", m);
	}


	public List<Product> selectCartList(List<Map<String, Object>> list) {
		return session.selectList(map + "selectCartList", list);
	}
	
	public List<Product> selectRecentList(List<Map<String, Object>> list) {
		return session.selectList(map + "selectRecentList", list);
	}

	
	/**
     * 해당 상품의 리뷰들 조회
     * @param prodNo 리뷰들을 조회할 상품의 번호
	 * @return 조회된 상품 리스트
	 */
	public List<Review> selectReviewList(int prodNo) {
		return session.selectList(map + "selectReviewList", prodNo);
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
     * 리뷰 수정
     * @param r 사용자가 수정한 리뷰
     * @return 리뷰 수정 성공 여부
     */
	public boolean updateReview(Review r) {
		return session.update(map + "updateReview", r) > 0;
	}

	/**
     * 리뷰 삭제
     * @param reviewNo 삭제할 리뷰 번호
     * @return 리뷰 삭제 성공 여부
     */
	public boolean deleteReview(int reviewNo) {
		return session.update(map + "deleteReview", reviewNo) > 0;
	}

	/**
	 * 필터링에 사용되는 CategoryMain을 조회
	 * @return CategoryMain 배열
	 */
	public List<CategoryMain> selectCateMainList() {
		return session.selectList(map + "selectCateMainList");
	}

	/**
	 * 필터링에 사용되는 CategorySub을 조회
	 * @return CategorySub 배열
	 */
	public List<CategorySub> selectCateSubList() {
		return session.selectList(map + "selectCateSubList");
	}

	/**
	 * 필터링에 사용되는 Color들을 조회
	 * @return Color 배열
	 */
	public List<Palette> selectColorList() {
		return session.selectList(map + "selectColorList");
	}

	/**
	 * 필터링에 사용되는 SeeThrough을 조회
	 * @return SeeThrough 배열
	 */
	public List<String> selectseeThroughList() {
		return session.selectList(map + "selectseeThroughList");
	}

	/**
	 * 필터링에 사용되는 CategoryMain을 조회
	 * @return CategoryMain 배열
	 */
	public List<Product> selectMainCateList(int cateMain) {
		return session.selectList(map + "selectMainCateList", cateMain);
	}

	
	public List<Product> selectSubCateList(HashMap<String, Integer> map2) {
		return session.selectList(map + "selectSubCateList", map2);
	}

	/**
	 * 필터링에 사용되는 Line을 조회
	 * @return Line 배열
	 */
	public List<String> selectLining() {
		return session.selectList(map + "selectLining");
	}

	/**
	 * 필터링에 사용되는 Price를 조회
	 * @return Price 배열
	 * @apiNote 아직 안쓰이는 것(일거)임
	 */
	public List<Integer> selectPrice() {
		return session.selectList(map + "selectPrice");
	}

	/**
     * 베스트 상품들, 아우터상품들 싹다 할거임 강민구
     * @param reviewNo 삭제할 리뷰 번호
     * @return 리뷰 삭제 성공 여부
     */
	public List<Product> bestProducts() {
		return session.selectList(map + "bestProducts");
	}
	
	public List<Product> outerProducts() {
		
		return session.selectList(map + "outerProducts");
	}

	public List<Product> topProducts() {
		return session.selectList(map + "topProducts");
	}

	public List<Product> bottomProducts() {
		return session.selectList(map + "bottomProducts");
	}

	public List<Product> underProducts() {
		return session.selectList(map + "underProducts");
	}

	public List<Product> accProducts() {
		return session.selectList(map + "accProducts");
	}

	public List<Product> sellerList() {
		return session.selectList(map + "sellerList");
	}

	public int sellerListUpdate(int prodNo) {
		return session.update(map + "sellerListUpdate", prodNo);
	}

	public int sellerListYUpdate(int prodNo) {
		return session.update(map + "sellerListYUpdate", prodNo);
	}

	public void increaseOrdered(int prodNo) {
		session.update(map + "increaseOrdered", prodNo);
		
	}



	
	
	

	
}
