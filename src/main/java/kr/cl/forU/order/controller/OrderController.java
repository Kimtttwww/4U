package kr.cl.forU.order.controller;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import jakarta.servlet.http.HttpSession;
import kr.cl.forU.member.model.vo.Member;
import kr.cl.forU.order.model.service.OrderService;
import kr.cl.forU.product.model.vo.CategoryMain;
import kr.cl.forU.product.model.vo.CategorySub;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SessionAttributes({"loginMember"})
@RequestMapping("/order")
@RestController
public class OrderController {

	@Autowired
	OrderService service;
	
	@PostMapping("/loadOrdererInfo")
	public Member selectOrdererInfo(
			@RequestParam("memberNo") int memberNo,
			Model model, 
			HttpSession session){
		log.info("memberNo ? {}" , memberNo);
		Member orderer = service.selectOrdererInfo(memberNo);
		
		log.info("orderer ? {}" , orderer);
//		if(orderer == null){
////			session.setAttribute("loginMember", member);
//			model.addAttribute("msg", "오류발생");
//			return null;
//		}
		
		return orderer;
	}
	

	@PostMapping("/mainCate")
	public List<CategoryMain> selectMainCate(){
		
		List<CategoryMain> main = service.selectMainCate();
		return main;
	}
	
	@PostMapping("/subCate")
	public List<CategorySub> selectSubCate(
			@RequestBody CategoryMain cateMain){
		List<CategorySub> sub = service.selectSubCate(cateMain.getCateMain());
		return sub;
	}
	
}
