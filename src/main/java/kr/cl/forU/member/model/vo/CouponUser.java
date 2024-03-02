package kr.cl.forU.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CouponUser extends Coupon {

	private int memberNo;
	private int couponNo;
	private String validityDate;
	private String status;
	
}
