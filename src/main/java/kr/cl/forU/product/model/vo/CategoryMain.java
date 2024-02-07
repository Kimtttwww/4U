package kr.cl.forU.product.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CategoryMain {

	/** 카테고리(대분류) */
	private int cateMain;
	/** 대분류 이름 */
	private String mainName;
}
