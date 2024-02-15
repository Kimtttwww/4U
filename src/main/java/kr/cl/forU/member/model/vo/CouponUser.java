package kr.cl.forU.member.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CouponUser {

	private int memberNo;
	private int couponNo;
	private Date validityDate;
	private String status;
	
}
