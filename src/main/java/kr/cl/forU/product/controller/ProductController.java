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
import org.springframework.web.bind.annotation.CookieValue;
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

@Slf4j
@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductService service;
    
	
    /**
     * 상품들 조회
     * @param m 필터를 걸 서브 카테고리 값
	 * @return 조회된 상품 리스트
	 */
    @GetMapping("list")
    public List<Product> selectProductList(@RequestParam Map<String, String> m) {
    	return service.selectProductList(m);
    }
    
    @GetMapping("/")
    public List<Product> bestProducts(){
    	return service.bestProducts();
    }
    
    @GetMapping("/cart/CartList")
    public List<Product> selectCartList(@CookieValue(value = "cart", defaultValue = "[]") String cartCookie) {
        List<Integer> prodNo = extractProdNosFromCart(cartCookie);
        log.info("prodNo" + prodNo);
        return service.selectCartList(prodNo);
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

    @GetMapping("/productSearch")
    private List<Product> extractProdFromCate(@RequestParam HashMap<String, String> map) {
    	// 주소창에 color 라는 이름을 쓰면 됩니다.
    	return service.extractProdFromCate(map);
    }

    @PostMapping("/loadProdName")
    public List<Product> selectProdName(@RequestBody int[] prodNo) {
    	
    	List<Product> prodName = new ArrayList<>();
    	for(int idx = 0; idx < prodNo.length; idx++) {
    		prodName.add(service.selectProdName(prodNo[idx]));
    	}
    	return prodName;
    }

    @PostMapping("/loadProdDetail")
    public List<ProdDetail> selectProdDetailList(@RequestBody int prodNo){
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
    	if(m.get("prodNo") == null) {m.put("prodNo", 0);}
    	if(m.get("memberNo") == null) {m.put("memberNo", 0);}
    	
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
    
    @PostMapping("/loadProdImg")
	public List<Image> selectProdImageList(@RequestBody int[] prodNo){
		List<Image> imgList = new ArrayList<>();
		
		for (int idx = 0; idx < prodNo.length; idx++) {
			imgList.addAll(service.selectProdImageList(prodNo[idx]));
		}
				
		log.info("Img List ??{}", imgList );
		return imgList;
	}

	
	
	
	
	
	
	
}
