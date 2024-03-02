package kr.cl.forU.order.model.vo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
	private int orderNo;
	private int memberNo;
	private String orderName;
	private String orderDate;
	private String receiver;
	private String receivePhone;
	private String address;
	private String addressDetail;
	private String zipCode;
	private String message;
	private int totalCount;
	private int couponNo;
	private int point;
	private int totalPrice;
	private int paymentPrice;
	private String payment;
	
	
	// OrderProd 객체 만들기 위한 변수
	private List<Integer> index;	// 컬러 사이즈 를 알수 있는 키값
	private List<Integer> prodNo;
	private List<Integer> count;
	private List<Integer> price;
	
	// 주문금액에 따른 grade 등급처리를 위한 변수
	private int gradeNo;
}
