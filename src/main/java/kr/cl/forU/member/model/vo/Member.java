package kr.cl.forU.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Member {

	/** 회원 번호 */
	private int memberNo;
	/** ID */
	private String memberId;
	/** PWD */
	private String memberPwd;
	/** 사용자명 */
	private String memberName;
	/** 생년월일 */
	private String email;
	/** 이메일 */
	private String phone;
	/** 연락처 */
	private String birthday;
	/** 가입일 */
	private String createDate;
	/** 상태 */
	private String status;
	/** 주소 */
	private String address;
	/** 주소(상세) */
	private String addressDetail;
	/** 우편번호 */
	private String zipCode;
	/** 회원등급 */
	private int gradeNo;
	/** 포인트 */
	private int point;
}
