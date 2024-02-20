package kr.cl.forU.product.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
    
    /** 상품들 조회
	 * @return 조회된 상품 리스트
	 */
    @GetMapping("list")
    public List<Product> selectProductList() {
        return service.selectProductList();
    }
    
    @GetMapping("CartList")
    public List<Product> selectCartList() {
    	return service.selectCartList();
    }
    
}

