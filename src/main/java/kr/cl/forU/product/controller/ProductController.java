package kr.cl.forU.product.controller;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.cl.forU.product.model.service.ProductService;
import kr.cl.forU.product.model.vo.Product;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	ProductService productService;

	@Autowired
	ProductService service;
    
    /**
     * 상품들 조회
	 * @return 조회된 상품 리스트
	 */
    @GetMapping("list/{cateSub}")
    public List<Product> selectProductList(@PathVariable int cateSub) {
        return service.selectProductList(cateSub);
    }
    
    @GetMapping("/")
    public List<Product> bestProducts(){
    	return service.bestProducts();
    }
    
    @GetMapping("/cart/CartList")
    public List<Product> selectCartList(@CookieValue(value = "cart", defaultValue = "[]") String cartCookie) {
        List<Integer> prodNo = extractProdNosFromCart(cartCookie);
        return service.selectCartList(prodNo);
    }
    

    private List<Integer> extractProdNosFromCart(String cartCookie) {
        List<Integer> prodNos = new ArrayList<>();

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

    
}

