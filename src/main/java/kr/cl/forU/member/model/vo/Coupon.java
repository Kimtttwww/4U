package kr.cl.forU.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Coupon {

	private int couponNo;
	private String couponName;
	private int discountRate;
	private int discount;
}
