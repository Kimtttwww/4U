package kr.cl.forU.product.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    /** 최근 본 상품 목록을 저장할 쿠키 이름 */
    private static final String RECENT_PRODUCTS_COOKIE = "recentProducts";

    
    @GetMapping("detail")
    public String getProductDetail(HttpServletRequest request, HttpServletResponse response) {
        String prodNoParam = request.getParameter("prodNo");
//        int prodNo = Integer.parseInt(prodNoParam);
        
        try {
//            Product product = productService.getProductById(prodNo);
            
            // 최근 본 상품 목록을 쿠키에서 가져오기
            Cookie[] cookies = request.getCookies();
            String recentProducts = null;
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if (cookie.getName().equals(RECENT_PRODUCTS_COOKIE)) {
                        recentProducts = cookie.getValue();
                        break;
                    }
                }
            }

            // 최근 본 상품 목록을 List로 변환
            List<Integer> recentProductIds = new ArrayList<>();
            if (recentProducts != null && !recentProducts.isEmpty()) {
                String[] productIds = recentProducts.split(",");
                for (String productId : productIds) {
                    recentProductIds.add(Integer.parseInt(productId));
                }
            }

            // 새로운 상품을 최근 본 상품 목록에 추가
//            recentProductIds.add(prodNo);
            
            // 최근 본 상품 목록을 쿠키에 다시 저장
            StringBuilder sb = new StringBuilder();
            for (Integer recentProductId : recentProductIds) {
                sb.append(recentProductId).append(",");
            }
            String updatedRecentProducts = sb.toString();
            Cookie recentProductsCookie = new Cookie(RECENT_PRODUCTS_COOKIE, updatedRecentProducts);
            recentProductsCookie.setMaxAge(30 * 24 * 60 * 60); // 30일 동안 유지
            recentProductsCookie.setPath("/");
            response.addCookie(recentProductsCookie);

            // 상품 상세 페이지로 리다이렉트
//            return "redirect:/product-detail/" + prodNo;
        } catch (Exception e) {
            e.printStackTrace();
            return "error-page"; // 예외 처리 페이지로 리다이렉트 또는 에러 메시지 반환
        }
		return null;
    }
    
    /**
     * 상품들 조회
	 * @return 조회된 상품 리스트
	 */
    @GetMapping("list/{cateSub}")
    public List<Product> selectProductList(@PathVariable int cateSub) {
        return service.selectProductList(cateSub);
    }
    
}

