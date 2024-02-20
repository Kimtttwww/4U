package kr.cl.forU.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CouponUser extends Coupon {

	private int memberNo;
	private int couponNo;
	private String validityDate;
	private String status;
	
}
