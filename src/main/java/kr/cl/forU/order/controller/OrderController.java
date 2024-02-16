package kr.cl.forU.order.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import jakarta.servlet.http.HttpSession;
import kr.cl.forU.member.model.vo.Member;
import kr.cl.forU.order.model.service.OrderService;
import kr.cl.forU.order.model.vo.Order;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SessionAttributes({"loginMember"})
@RequestMapping("/order")
@RestController
public class OrderController {

	@Autowired
	OrderService service;
	
	@PostMapping("/loadOrdererInfo")
	public ResponseEntity<Member> selectOrdererInfo(
			@RequestBody Member memberNo,
			Model model, 
			HttpSession session){
		
		
		Member member = service.selectOrdererInfo(memberNo);
		
//		String phone = member.getPhone().replace("-", "");
//		member.setPhone(phone);
//		log.info("phone {}", phone);
		
		if(member != null){
//			session.setAttribute("loginMember", member);
			return ResponseEntity.status(HttpStatus.OK).body(member);
		}
		model.addAttribute("msg", "오류발생");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(member);
	}
	
	
//	@PostMapping("/loadOrder")
//	public ResponseEntity<List<Order>> selectOrderInfo(
//			@RequestBody Member memberNo,
//			Model model
//			){
//		
//		List<Order> order = service.selectOrderInfo(memberNo);
//		log.info("order {}", order);
//		if(order != null){
//			return ResponseEntity.status(HttpStatus.OK).body(order);
//		}
//		model.addAttribute("msg", "오류발생");
//		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(order);
//		
//	}
	
	
	
	
}
