package kr.cl.forU.order.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
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
	
    @Value("${iamport.key}")
    private String restApiKey;
    @Value("${iamport.secret}")
    private String restApiSecret;

    private IamportClient iamportClient;
    
	
	@PostMapping("/loadOrdererInfo")
	public Member selectOrdererInfo(
			@RequestParam("memberNo") int memberNo,
			Model model, 
			HttpSession session){
		Member orderer = service.selectOrdererInfo(memberNo);
		
		return orderer;
	}
	

	@PostMapping("/mainCate")
	public List<CategoryMain> selectMainCate(){
		
		List<CategoryMain> main = service.selectMainCate();
		log.info("main ? {}" , main);
		return main;
	}
	
	@PostMapping("/subCate")
	public List<CategorySub> selectSubCate(
			@RequestBody CategoryMain cateMain){
		List<CategorySub> sub = service.selectSubCate(cateMain.getCateMain());
		log.info("sub ? {}" , sub);
		return sub;
	}
	
	
    @PostConstruct
    public void init() {
        this.iamportClient = new IamportClient("3581414205741361", "nxBzJ4jQSZalFmcDghVwJf5oCkO2eH0hR5uqSA9xCa50Cj87cflgz1V26TN1UrWTef0IGJJeiRMgxSgC");
    }


    @ResponseBody
    @PostMapping("/verifyIamport/{imp_uid}")
    public IamportResponse<Payment> paymentByImpUid(
            Model model, 
            HttpSession session, 
            @PathVariable("imp_uid") String imp_uid) 
            		throws IamportResponseException, IOException
    {
        return iamportClient.paymentByImpUid(imp_uid);
    }
	
	
}
