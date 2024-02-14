package kr.cl.forU.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import kr.cl.forU.review.model.service.ReviewService;

@Controller
public class ReviewController {

	@Autowired
	ReviewService service;
}
