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
    
    /**
     * 상품들 조회
     * @param cateSub 필터를 걸 서브 카테고리 값
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
    
    @GetMapping("CartList")
    public List<Product> selectCartList() {
    	return service.selectCartList();
    }
    
}

