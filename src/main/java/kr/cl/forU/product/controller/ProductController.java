package kr.cl.forU.product.controller;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
@SuppressWarnings("rawtypes")
public class ProductController {

	@Autowired
	ProductService service;
	
	/*
	 * 관리자 페이지 상품관리
	 */
	@GetMapping("/sellerList")
	public List<Product> sellerList() {
		return service.sellerList();
	}
	
	@PutMapping("/sellerListUpdate/{prodNo}")
	public int sellerListUpdate(@PathVariable int prodNo) {
		return service.sellerListUpdate(prodNo);
	}
	
	@PutMapping("/sellerListYUpdate/{prodNo}")
	public int sellerListYUpdate(@PathVariable int prodNo) {
		return service.sellerListYUpdate(prodNo);
	}
	
	/**
	 * 상품들 조회
	 * @param m 필터를 걸 서브 카테고리 값
	 * @return 조회된 상품 리스트
	 */
	@GetMapping("list")
	public List<Product> selectProductList(@RequestParam Map<String, Object> m) {
		log.info("selectProductList\nm = {}", m);
		List<Product> list = service.selectProductList(m);
		log.info("selectProductList\nlist = {}", list);
		
		String size = (String) m.get("size");
		String color = (String) m.get("color");
		
		if(size != null || color != null && !list.isEmpty()) {
			List<Product> filteredList = new ArrayList<>();
			List<String> filterSize = null;
			List<Integer> filterColor = null;
			 
			if(size != null) filterSize = Arrays.asList(size.split(","));
			if(color != null) filterColor = transform(Arrays.asList(color.split(",")));

			for (Product product : list) {
				List<ProdDetail> detail = product.getDetail();
				
				for (ProdDetail dtl : detail) {
					if(filterSize != null && filterSize.contains(dtl.getSize())) {
						filteredList.add(product);
						break;
					}
					
					if(filterColor != null && filterColor.contains(dtl.getColorNo())) {
						filteredList.add(product);
						break;
					}
				}
			}
			
			list = filteredList;
		}
		
		return list;
	}
	
	/**
	 * String List를 특정 자료형의 List로 바꿔주는 fn
	 * @param list 숫자값을 담은 String list
	 * @return 숫자값의 String list
	 */
	public static List<Integer> transform(List<String> list) {
		return list.stream().map(Integer::parseInt).collect(Collectors.toList());
	}

//	메인메뉴 베스트 상품들 - 민구
	@GetMapping("bestProducts")
	public List<Product> bestProducts() {
		return service.bestProducts();
	}

// 	메인메뉴 아우터 상품들 - 민구
	@GetMapping("outerProducts")
	public List<Product> outerProducts() {
		return service.outerProducts();
	}
	
//	메인메뉴 상의 상품들 - 민구
	@GetMapping("topProducts")
	public List<Product> topProducts() {
		return service.topProducts();
	}

// 	메인메뉴 하의 상품들 - 민구
	@GetMapping("bottomProducts")
	public List<Product> bottomProducts() {
		return service.bottomProducts();
	}
	
//	메인메뉴 언더웨어 상품들 - 민구
	@GetMapping("underProducts")
	public List<Product> underProducts() {
		return service.underProducts();
	}

// 	메인메뉴 ACC 상품들 - 민구
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
	
	@GetMapping("/recent")
	public List<Product> selectRecentList(@CookieValue(value = "recentProduct" , defaultValue = "[]") String recentCookie) {
	    List<Map<String,Object>> list = new ArrayList<>();
	    
	    try {
	        String decodedCookie = URLDecoder.decode(recentCookie, StandardCharsets.UTF_8.toString());
	        JSONArray recentItems = new JSONArray(decodedCookie);
	        for(int i = 0; i < recentItems.length(); i++) {
	            Map<String,Object> map = new HashMap<>();
	            map.put("prodNo", recentItems.getInt(i)); // Integer로 처리
	            list.add(map);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    return service.selectRecentList(list);
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
	 * @param prodNo 리뷰들을 조회할 상품의 번호
	 * @return 조회된 상품 리스트
	 */
	@GetMapping("review/{prodNo}")
	public List<Review> selectReviewList(@PathVariable int prodNo) {
		return service.selectReviewList(prodNo);
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
	 * @param m 상품번호(prodNo)와 회원번호(memberNo)가 필요, 없으면 기본값 0
	 * @return 해당 회원이 특정 상품을 구매 했었는지 여부
	 */
	@GetMapping("review/check")
	public boolean reviewerCheck(@RequestParam Map<String, Integer> m) {
		if (m.get("prodNo") == null) {m.put("prodNo", 0);}
		if (m.get("memberNo") == null) {m.put("memberNo", 0);}

		return service.reviewerCheck(m);
	}

	/**
	 * 리뷰 작성
	 * @param r 사용자가 작성한 리뷰
	 * @return 등록 성공 여부
	 */
	@PostMapping("review")
	public boolean insertReview(@RequestBody Review r) {
		return service.insertReview(r);
	}

    /**
     * 리뷰 수정
     * @param r 사용자가 수정한 리뷰
     * @return 리뷰 수정 성공 여부
     */
    @PutMapping("review")
    public boolean updateReview(@RequestBody Review r) {
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
