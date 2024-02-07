package kr.cl.forU.product.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CategorySub {

	/** 카테고리(대분류) */
	private int cateMain;
	/** 카테고리(소분류) */
	private int cateSub;
	/** 소분류 이름 */
	private String subName;
}
