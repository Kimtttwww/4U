package kr.cl.forU.order.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderProd {

	private int orderNo;
	private int index;
	private int prodNo;
	private int count;
	private int price;
}
