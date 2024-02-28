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
    	if(m.get("cateMain") == null) m.put("cateMain", "0");
    	if(m.get("cateSub") == null) m.put("cateSub", "0");
    	
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
    	log.info("prodName ? {}", prodName.toString());

    	return prodName;
    }

    @PostMapping("/loadProdDetail")
    public List<ProdDetail> selectProdDetailList(@RequestBody int prodNo){
    	log.info(" selectProdDetailList ", service.selectProdDetailList(prodNo));
    	return service.selectProdDetailList(prodNo);
    }
    
    @GetMapping("/palettes")
    public List<Palette> selectColors() {
        return service.selectColors();
    }

}
