package kr.cl.forU.product.model.vo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {
	
	/** 상품번호 */
	private int prodNo;
	/** 상품명 */
	private String prodName;
	/** 상품 설명 */
	private String prodCap;
	/** 상품 등록일 */
	private String uploadDate;
	/** 상품 가격 */
	private int Price;
	/** 상훔의 할인율 */
	private double discount;
	/** 카테고리(소분류) */
	private int cateSub;
	/** 삼품이 주문된 수 */
	private int ordered;
	/** 상태 */
	private String status;
	/** 옷감 두께 */
	private String thickness;
	/** 옷의 안감 */
	private String lining;
	/** 옷의 비침 정도 */
	private String seeThrough;
	/** 옷감 종류 */
	private String fabric;
	/** 옷감의 디자인(패턴) */
	private String pattern;
	/** 옷의 각선(라인)? */
	private String line;
	/** 옷에 맞는 계절 */
	private String season;
	
	/**	해당 상품의 조합 */
	private List<ProdDetail> detail;
	/**	해당 상품의 이미지들 */
	private List<ProdDetail> image;
}
