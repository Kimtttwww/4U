package kr.cl.forU.product.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Palette {

	/** 색상 번호 */
	private int colorNo;
	/** 사진 이름 */
	private String imgName;
	/** 색상명 */
	private String colorName;
	/** 색상코드 */
	private String rgb;
}
