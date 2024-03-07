package kr.cl.forU.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class NoticeDetail {
	
	private int noticeType;
	private String noticeMessage;
	
	/** 회원 가입시 */
	public static final int NEW_MEMBER = 1;
	/** 상품 주문시 */
	public static final int NEW_ORDERED = 2;
	/** 문의사항 발생시 */
	public static final int NEW_QNA = 3;
	/** 리뷰 작성시 */
	public static final int NEW_REVIEW = 4;
}
