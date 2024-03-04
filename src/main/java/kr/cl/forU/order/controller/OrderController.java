package kr.cl.forU.order.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpSession;
import kr.cl.forU.member.model.service.MemberService;
import kr.cl.forU.member.model.vo.CouponUser;
import kr.cl.forU.member.model.vo.Member;
import kr.cl.forU.order.model.service.OrderService;
import kr.cl.forU.order.model.vo.RecentOrders;
import kr.cl.forU.order.model.vo.Order;
import kr.cl.forU.order.model.vo.OrderDTO;
import kr.cl.forU.order.model.vo.OrderProd;
import kr.cl.forU.product.model.service.ProductService;
import kr.cl.forU.product.model.vo.CategoryMain;
import kr.cl.forU.product.model.vo.CategorySub;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SessionAttributes({ "loginMember" })
@RequestMapping("/order")
@RestController
public class OrderController {

	@Autowired
	OrderService service;
	@Autowired
	MemberService mService;
	@Autowired
	ProductService pService;

	@Value("${iamport.key}")
	private String restApiKey;
	@Value("${iamport.secret}")
	private String restApiSecret;

	private IamportClient iamportClient;
//	private boolean couponIssued = false;

	@GetMapping("/selectOrderNo")
	public ResponseEntity<Integer> selectOrderNo() {
		int num = service.selectOrderNo();
		return ResponseEntity.ok(num);
	}

	@PostMapping("/loadMemberInfo")
	public Member selectOrdererInfo(@RequestBody int memberNo) {
		Member member = mService.selectMemberInfo(memberNo);
		return member;
	}

	@PostMapping("/mainCate")
	public List<CategoryMain> selectMainCate() {

		List<CategoryMain> main = service.selectMainCate();
		return main;
	}

	@PostMapping("/subCate")
	public List<CategorySub> selectSubCate(@RequestBody CategoryMain cateMain) {
		List<CategorySub> sub = service.selectSubCate(cateMain.getCateMain());
		return sub;
	}

	// 결제API
	@PostConstruct
	public void init() {
		this.iamportClient = new IamportClient("3581414205741361",
				"nxBzJ4jQSZalFmcDghVwJf5oCkO2eH0hR5uqSA9xCa50Cj87cflgz1V26TN1UrWTef0IGJJeiRMgxSgC");
	}

	// 결제API 연결
	@ResponseBody
	@PostMapping("/verifyIamport/{imp_uid}")
	public IamportResponse<Payment> paymentByImpUid(Model model, HttpSession session,
			@PathVariable("imp_uid") String imp_uid) throws IamportResponseException, IOException {

		return iamportClient.paymentByImpUid(imp_uid);
	}

	@PostMapping("/loadUserCoupon")
	public List<CouponUser> selectUserCoupon(@RequestBody int memberNo) {
		List<CouponUser> list = service.selectUserCoupon(memberNo);

		return list;
	}
	

	@PostMapping("/insertOrder")
    public int insertOrder(
    		@RequestBody OrderDTO orderDTO
    		) {
    	// 결제완료되면 ORDER, ORDER_PROD 테이블에 insert해주기
    	// insert완료하면 쿠폰사용했을 경우 COUPON 테이블 update,
    	// 포인트 사용했을 경우, 구매금액에 따라 MEMBER 회원등급 처리
    	// 판매자에게 주문건 알림 
		
    	log.info("orderDTO > " +  orderDTO.toString());
    	Order order = Order.builder().orderNo(orderDTO.getOrderNo())
    			.memberNo(orderDTO.getMemberNo())
    			.orderName(orderDTO.getOrderName())
    			.orderDate(orderDTO.getOrderDate())
    			.receiver(orderDTO.getReceiver())
    			.receivePhone(orderDTO.getReceivePhone())
    			.address(orderDTO.getAddress())
    			.addressDetail(orderDTO.getAddressDetail())
    			.zipCode(orderDTO.getZipCode())
    			.message(orderDTO.getMessage())
    			.totalCount(orderDTO.getTotalCount())
    			.couponNo(orderDTO.getCouponNo())
    			.point(orderDTO.getPoint())
    			.totalPrice(orderDTO.getTotalPrice())
    			.paymentPrice(orderDTO.getPaymentPrice())
    			.payment(orderDTO.getPayment()).build();
    	
    	log.info("orderDTO.getPoint() > {}" , orderDTO.getPoint());
    	int result = service.insertOrder(order);
    	
    	if(result == 1) {
    		log.info("insertOrder 성공!!");
    		
    		for(int idx = 0; idx < orderDTO.getProdNo().size(); idx++) {
    			OrderProd orderProd = OrderProd.builder()
    					.orderNo(orderDTO.getOrderNo())
        				.index(orderDTO.getIndex().get(idx))
        				.prodNo(orderDTO.getProdNo().get(idx))
        				.count(orderDTO.getCount().get(idx))
        				.price(orderDTO.getPrice().get(idx))
        				.build();
    			service.insertOrderProd(orderProd);
    		}
    	}else {
    		log.info("insertOrder 실패 ㅠㅠ");
    	}
    	
    	if(orderDTO.getCouponNo() > 0) {
			log.info("insertOrderProd 성공!! 쿠폰update 들어옴");
			CouponUser coupon = CouponUser.builder()
					.memberNo(orderDTO.getMemberNo())
					.couponNo(orderDTO.getCouponNo())
					.build();
			  service.updateCouponUser(coupon);
			
		}else {
			log.info("updateCouponUser 실패!!");
		}
		
		if(orderDTO.getPoint() > 0) {
			log.info("포인트 update 들어옴");
			Member m = Member.builder()
					.memberNo(orderDTO.getMemberNo())
					.point(orderDTO.getPoint())
					.build();
			 mService.updateMemberPoint(m);
			
		}else {
			log.info("updateMemberPoint 실패!!");
		}
		
		// 주문테이블에 넣는 것이 최종 성공이 완료가 되면..
		// 등급업 함수를 호출하면 된다,..
		log.info("기존 GradeNo  ? {}", orderDTO.getGradeNo());
		setGrade(orderDTO.getMemberNo());
		log.info("변경 GradeNo  ? {}", orderDTO.getGradeNo());
	
		
		return 6;
    }
	

	public void setGrade(int memberNo) {
		// 기본 브론즈1 / 30만원(이상)-실버2 	60만원-골드3 	100만원-다이아4 	200만원-VIP5
		// 등급과 토탈구매금액을 체크해서 update해주기
		// 등급업되면 축하쿠폰 발행하기
		log.info("멤버grade 업데이트 함수들어옴");
		Member member = mService.selectMemberInfo(memberNo);
		int totalPay = service.selectUserTotalPay(memberNo);
			
		log.info("totalPay ? {}", totalPay);
		
		
//		if(totalPay > 300000  && totalPay <= 600000) {
//			// silver
//			member.setGradeNo(2);
//		}
//		else if(totalPay > 600000  && totalPay <= 1000000) {
//			// gold
//			member.setGradeNo(3);
//		}
//		else if(totalPay > 1000000  && totalPay <= 2000000) {
//			// dia
//			member.setGradeNo(4);
//		}
//		else {
//			//vip
//			member.setGradeNo(5);
//		}
		
		
		if(totalPay > 2000000) { //vip
			member.setGradeNo(5);
		}else if(totalPay > 1000000) { // dia
			member.setGradeNo(4);
		}else if(totalPay > 600000) { // gold
			member.setGradeNo(3);
		}else if(totalPay > 300000) { // silver
			member.setGradeNo(2);
		}else {
			member.setGradeNo(1);
		}
		log.info("GradeNo ? {}", member.getGradeNo());
		
		if(member.getGradeNo() != 1) {
			if(mService.updateMemberGrade(member) > 0) {
				log.info("멤버grade 업데이트 성공했댜~ {}", member.getGradeNo());
			}else {
				log.info("멤버grade 업데이트 실패 {}", member.getGradeNo());
			}
		}
		
		
//		int gradeCoupon = mService.insertGradeCoupon();
	}
	
	
	@PostMapping("/selectPointRate")
    public int selectGradeRate(
    		@RequestBody int memberNo
    		) {
		
		return mService.selectPointRate(memberNo);
	}
    
	@GetMapping("/list")
	public List<RecentOrders> selectRecentOrders(@RequestParam("orderDate") String orderDate) {
		return service.selectRecentOrders(orderDate);
	}
	
	
    @GetMapping("/history")
    public List<Order> getAllOrders(@RequestParam int memberNo) {
        return service.getAllOrders(memberNo);
    }
    
    @GetMapping("/oghistory")
    public List<Order> selectOgOrder(@RequestParam int memberNo) {
    	return service.selectOgOrder(memberNo);
    }
	
}
