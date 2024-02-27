package kr.cl.forU.order.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RecentOrders {

	private int orderNo;
	private String orderDate;
	private String prodName;
	private String size;
	private String colorName;
	private int count;
	private String orderName;
	
	
}