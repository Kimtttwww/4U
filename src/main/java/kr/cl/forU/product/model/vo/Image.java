package kr.cl.forU.product.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Image extends Palette {

	/** 이미지 번호	 */
	private int imgNo;
	/** 참조번호(상품번호 or 리뷰번호 or 문의번호) */
	private int refNo;
	/** 이미지 용도(1:썸네일/2:상세/3:리뷰(null)/4:문의(null)) */
	private int imgType;
}
