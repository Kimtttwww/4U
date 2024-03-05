package kr.cl.forU.product.controller;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.cl.forU.product.model.service.ProductService;
import kr.cl.forU.product.model.vo.Palette;
import kr.cl.forU.product.model.vo.Image;
import kr.cl.forU.product.model.vo.ProdDetail;
import kr.cl.forU.product.model.vo.Product;
import kr.cl.forU.product.model.vo.Review;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PutMapping;

@Slf4j
@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductService service;

	/**
	 * 상품들 조회
	 * 
	 * @param m 필터를 걸 서브 카테고리 값
	 * @return 조회된 상품 리스트
	 */
	@GetMapping("list")
	public List<Product> selectProductList(@RequestParam Map<String, List> m) {
		log.info("selectProductList\nm = {}", m);
		return service.selectProductList(m);
	}

//	메인메뉴 베스트 상품들 - 민구
	@GetMapping("bestProducts")
	public List<Product> bestProducts() {
		return service.bestProducts();
	}

// 메인메뉴 아우터 상품들 - 민구
	@GetMapping("outerProducts")
	public List<Product> outerProducts() {
		return service.outerProducts();
	}
	
// 메인메뉴 상의 상품들 - 민구
	
	@GetMapping("topProducts")
	public List<Product> topProducts() {
		return service.topProducts();
	}

// 메인메뉴 하의 상품들 - 민구
	
	@GetMapping("bottomProducts")
	public List<Product> bottomProducts() {
		return service.bottomProducts();
	}
	
// 메인메뉴 언더웨어 상품들 - 민구

	@GetMapping("underProducts")
	public List<Product> underProducts() {
		return service.underProducts();
	}

// 메인메뉴 ACC 상품들 - 민구
	
	@GetMapping("accProducts")
	public List<Product> accProducts() {
		return service.accProducts();
	}
	

	@GetMapping("/cart/CartList")
	public List<Product> selectCartList(@CookieValue(value = "cart", defaultValue = "[]") String cartCookie) {
		List<Map<String, Object>> list = new ArrayList<>();
		
		try {
			JSONArray cartItems = new JSONArray(cartCookie);
			for (int i = 0; i < cartItems.length(); i++) {
					JSONObject item = cartItems.getJSONObject(i);
					Map<String, Object> map = new HashMap<>();
					map.put("prodNo", item.getInt("prodNo"));
					map.put("index", item.getInt("index"));
					map.put("size", item.getString("size"));
					list.add(map);
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return service.selectCartList(list);
	}

	private List<Integer> extractProdNosFromCart(String cartCookie) {
		List<Integer> prodNos = new ArrayList<Integer>();

		try {
			JSONArray cartArray = new JSONArray(URLDecoder.decode(cartCookie, "UTF-8"));

			for (int i = 0; i < cartArray.length(); i++) {
				JSONObject item = cartArray.getJSONObject(i);
				int prodNo = item.getInt("prodNo");
				prodNos.add(prodNo);
			}
		} catch (JSONException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return prodNos;
	}

	/**
	 * 해당 상품의 리뷰들 조회
	 * 
	 * @param prodNo 리뷰들을 조회할 상품의 번호
	 * @return 조회된 상품 리스트
	 */
	@GetMapping("review/{prodNo}")
	public List<Review> selectReviewList(@PathVariable int prodNo) {
		return service.selectReviewList(prodNo);
	}

	@GetMapping("/productSearch")
	private List<Product> extractProdFromCate(@RequestParam HashMap<String, String> map) {
		// 주소창에 color 라는 이름을 쓰면 됩니다.
		return service.extractProdFromCate(map);
	}

	@PostMapping("/loadProdName")
	public List<Product> selectProdName(@RequestBody int[] prodNo) {

		List<Product> prodName = new ArrayList<>();
		for (int idx = 0; idx < prodNo.length; idx++) {
			prodName.add(service.selectProdName(prodNo[idx]));
		}
		return prodName;
	}

	@PostMapping("/loadProdDetail")
	public List<ProdDetail> selectProdDetailList(@RequestBody int prodNo) {
		return service.selectProdDetailList(prodNo);
	}

	@GetMapping("/palettes")
	public List<Palette> selectColors() {
		return service.selectColors();
	}

	/**
	 * 리뷰 작성 자격 확인
	 * 
	 * @param m 상품번호(prodNo)와 회원번호(memberNo)가 필요, 없으면 기본값 0
	 * @return 해당 회원이 특정 상품을 구매 했었는지 여부
	 */
	@GetMapping("review/check")
	public boolean reviewerCheck(@RequestParam Map<String, Integer> m) {
		if (m.get("prodNo") == null) {
			m.put("prodNo", 0);
		}
		if (m.get("memberNo") == null) {
			m.put("memberNo", 0);
		}

		return service.reviewerCheck(m);
	}

	/**
	 * 리뷰 작성
	 * 
	 * @param r 사용자가 작성한 리뷰
	 * @return 등록 성공 여부
	 */
	@PostMapping("review")
	public boolean insertReview(@RequestBody Review r) {
		return service.insertReview(r);
	}

	@PostMapping("/loadProdImg")
	public List<Image> selectProdImageList(@RequestBody int[] prodNo) {
		List<Image> imgList = new ArrayList<>();

		for (int idx = 0; idx < prodNo.length; idx++) {
			imgList.addAll(service.selectProdImageList(prodNo[idx]));
		}

		log.info("Img List ??{}", imgList);
		return imgList;
	}

    @GetMapping("/category")
    public HashMap<String, List> selectFilterList() {
        
    	return service.selectFilterList();
       // catemain 1:n
       // catesub 1:n
       // color 1:n
       // size (하드코딩) 1:5
       // seethrough 비침 덜비침 적당함 등등
       // 이 전체가 filter list 그래서 hashmap 형태로 담아야함 
       // 프론트에서 이러한 키밸류가 필요
       // filter.list. 변수명
       // 프론트에서 let[catemain,catesub,thickness,seethrough,color} = filterList
       // cateMain.map((cm) => {
        		// input type = "checkbox name = " id = "" span = {cm}
    	// select count from product group by see_through
    
	}
    
    /**
     * 리뷰 수정
     * @param r 사용자가 수정한 리뷰
     * @return 리뷰 수정 성공 여부
     */
    @PutMapping("review")
    public boolean updateReview(@RequestBody Review r) {
    	log.info("\nr = {}", r);
        return service.updateReview(r);
    }
    
    /**
     * 리뷰 삭제
     * @param reviewNo 삭제할 리뷰 번호
     * @return 리뷰 삭제 성공 여부
     */
    @DeleteMapping("review/{reviewNo}")
    public boolean deleteReview(@PathVariable int reviewNo) {
		return service.deleteReview(reviewNo);
	}
	
	@GetMapping("/listMainNo")
	public ResponseEntity<List<Product>> selectMainCateList(
			@RequestParam(name = "cateMain", required = false) int cateMain) {

		List<Product> list = service.selectMainCateList(cateMain);
    	log.info("cateMain list {}  >>",  list);
		return ResponseEntity.ok(list);
	}

	@GetMapping("listSubNo")
	public List<Product> selectSubCateList(
			@RequestParam(name = "cateMain", required = false) int cateMain,
			@RequestParam(name = "cateSub", required = false) int cateSub) {
//		log.info("cateMain {}, cateSub {} >>", cateMain, cateSub);
//		log.info("들어와????");
		HashMap<String, Integer> map = new HashMap<>();

		map.put("cateSub", cateSub);
		map.put("cateMain", cateMain);
//		log.info("map ?? {}", map);
//		log.info("답은?? {}", service.selectSubCateList(map));
		return service.selectSubCateList(map);
	}
	
}
