package kr.cl.forU.order.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Order {

	private int orderNo;
	private int index;
	private int prodNo;
	private int count;
	private int price;
}
