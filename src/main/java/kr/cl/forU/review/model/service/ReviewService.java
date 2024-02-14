package kr.cl.forU.review.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.review.model.dao.ReviewDao;

@Service
public class ReviewService {

	@Autowired
	ReviewDao dao;
}
