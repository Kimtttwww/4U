package kr.cl.forU.product.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CartItem {
	private int prodNo;
	private String prodName;
	private double price;
	private int count;

	// 생성자, getter 및 setter 생략
}
