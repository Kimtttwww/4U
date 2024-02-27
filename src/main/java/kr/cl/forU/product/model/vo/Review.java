package kr.cl.forU.product.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Review {

	/** 리뷰 번호 */
	private int reviewNo;
	/** 상품번호 */
	private int prodNo;
	/** 리뷰 작성자 번호 */
	private int memberNo;
	/** 리뷰 내용 */
	private String reviewContent;
	/** 작성일 */
	private String createDate;
	/** 별점 */
	private int rating;
	/** 상태 */
	private String status;
	/** 키 */
	private double height;
	/** 체중 */
	private double weight;
	/** 상의사이즈 */
	private String top;
	/** 하의사이즈 */
	private String bottom;
	/** 정사이즈 */
	private String isTrueToSize;
	/** 참조리뷰번호 */
	private int pReviewNo;
	
	/**	리뷰 작성자 이름 */
	private String memberName;
	
}
