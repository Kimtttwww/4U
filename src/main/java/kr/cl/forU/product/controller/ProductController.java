package kr.cl.forU.product.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.cl.forU.product.model.service.ProductService;
import kr.cl.forU.product.model.vo.Product;

@Controller
public class ProductController {

    // 최근 본 상품 목록을 저장할 쿠키 이름
    private static final String RECENT_PRODUCTS_COOKIE = "recentProducts";

    @GetMapping("/product/detail")
    public String getProductDetail(HttpServletRequest request, HttpServletResponse response) {
        // 상품 상세 정보를 가져오는 로직
        Product product = ProductService.getProductById(prodNo);
        
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
        List<Product> recentProductList = new ArrayList<>();
        if (recentProducts != null && !recentProducts.isEmpty()) {
            String[] productIds = recentProducts.split(",");
            for (String productId : productIds) {
                Product recentProduct = ProductService.getProductById(Integer.parseInt(productId));
                recentProductList.add(recentProduct);
            }
        }

        // 새로운 상품을 최근 본 상품 목록에 추가
        recentProductList.add(product);
        
        // 최근 본 상품 목록을 쿠키에 다시 저장
        StringBuilder sb = new StringBuilder();
        for (Product recentProduct : recentProductList) {
            sb.append(recentProduct.getProdNo()).append(",");
        }
        String updatedRecentProducts = sb.toString();
        Cookie recentProductsCookie = new Cookie(RECENT_PRODUCTS_COOKIE, updatedRecentProducts);
        recentProductsCookie.setMaxAge(30 * 24 * 60 * 60); // 30일 동안 유지
        recentProductsCookie.setPath("/");
        response.addCookie(recentProductsCookie);

        return "product-detail"; // 상품 상세 페이지로 이동
    }
}
