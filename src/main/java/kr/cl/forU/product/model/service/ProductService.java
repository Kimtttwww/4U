package kr.cl.forU.product.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.product.model.dao.ProductDao;
import kr.cl.forU.product.model.vo.Palette;
import kr.cl.forU.product.model.vo.Image;
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
	public List<Product> selectProductList(Map<String, Object> m ) {
		return dao.selectProductList(m);
	}

	public List<Product> bestProducts() {
		return dao.bestProducts();
	}


	/**
     * 해당 상품의 리뷰들 조회
     * @param prodNo 리뷰들을 조회할 상품의 번호
	 * @return 조회된 상품 리스트
	 */
	public List<Review> selectReviewList(int prodNo) {
		return dao.selectReviewList(prodNo);
	}

	public Product selectProdName(int prodNo) {
		return dao.selectProdName(prodNo);
	}

	public List<ProdDetail> selectProdDetailList(int prodNo) {
		return dao.selectProdDetailList(prodNo);
	}

	/**
     * 리뷰 작성 자격 확인
     * @param m 상품번호(prodNo)와 회원번호(memberNo)가 필요, 없으면 기본값 0
     * @return 해당 회원이 특정 상품을 구매 했었는지 여부
     */
	public boolean reviewerCheck(Map<String, Integer> m) {
		return dao.reviewerCheck(m);
	}

	public List<Palette> selectColors() {
		// TODO Auto-generated method stub
		return dao.selectColors();
	}

	/**
     * 리뷰 작성
     * @param r 사용자가 작성한 리뷰
     * @return 등록 성공 여부
     */
	public boolean insertReview(Review r) {
		return dao.insertReview(r);
	}

	public List<Image> selectProdImageList(int prodNo) {
		return dao.selectProdImageList(prodNo);
	}
	public HashMap<String, List> selectFilterList() {
		HashMap<String , List> map = new HashMap<>();
		ArrayList<String> size = new ArrayList<>();
		
		size.add("XS");
		size.add("S");
		size.add("M");
		size.add("L");
		size.add("XL");
		
		map.put("cateMain", dao.selectCateMainList());
		map.put("cateSub", dao.selectCateSubList());
		map.put("color", dao.selectColorList()); // 색상
		map.put("seeThrough", dao.selectseeThroughList()); // 옷의 비침 정도 
		map.put("lining", dao.selectLining()); // 옷의 안감
		map.put("price", dao.selectPrice()); // 가격
		map.put("size", size);
		
		return map;
	}
	// 사이즈는 별개로

	/**
	 * 리뷰 수정
	 * @param r 사용자가 수정한 리뷰
	 * @return 리뷰 수정 성공 여부
	 */
	public boolean updateReview(Review r) {
		return dao.updateReview(r);
	}

	/**
	 * 리뷰 삭제
	 * @param reviewNo 삭제할 리뷰 번호
	 * @return 리뷰 삭제 성공 여부
	 */
	public boolean deleteReview(int reviewNo) {
		return dao.deleteReview(reviewNo);
	}
	
	public List<Product> selectMainCateList(int cateMain) {
		return dao.selectMainCateList(cateMain);
	}

	public List<Product> selectSubCateList(HashMap<String, Integer> map) {
		return dao.selectSubCateList(map);
	}
	
	public List<Product> selectCartList(List<Map<String, Object>> list) {
		return dao.selectCartList(list);
	}

	public List<Product> selectRecentList(List<Map<String, Object>> list) {
		return dao.selectRecentList(list);
	}
	
	public List<Product> outerProducts() {
		return dao.outerProducts();
	}

	public List<Product> topProducts() {
		return dao.topProducts();
	}

	public List<Product> bottomProducts() {
		return dao.bottomProducts();
	}

	public List<Product> underProducts() {
		return dao.underProducts();
	}

	public List<Product> accProducts() {
		return dao.accProducts();
	}
	
	
	

}
