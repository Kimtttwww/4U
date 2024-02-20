package kr.cl.forU.product.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProdDetail extends Palette {

	/** 상품번호 */
	private int prodNo;
	/** 해당 상품의 경우의 수(0~) */
	private int index;
	/** 사이즈 */
	private String size;
	/** 재고수량 */
	private int stack;
	/** 상의기장 */
	private String top;
	/** 하의기장 */
	private String bottom;
}
