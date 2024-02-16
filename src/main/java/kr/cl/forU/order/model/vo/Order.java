package kr.cl.forU.order.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Order {
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
	private int coouponNo;
	private int point;
	private int totalPrice;
	private int paymentPrice;
	private String payment;
}
