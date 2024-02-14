package kr.cl.forU.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import kr.cl.forU.product.model.service.ProductService;

@Controller
public class ProductController {

	@Autowired
	ProductService service;
	
	
	
}
