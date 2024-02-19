import { Modal } from "react-bootstrap";
import "../css/product/ProdDetail.css"
import Cookies from "js-cookie";

/**
 * 상품 상세 모달창
 * @props props
 * 	@param {boolean} showDetail 상품 상세 모달창의 표시 여부 state
 * 	@param {function} setShowDetail 상품 상세 모달창의 표시 여부 state's setter fn
 * 	@param {object} product 상품 상세 모달창에 보여줄 상품 state
 */
export default function ProdDetail(props) {
	
	const {showDetail, setShowDetail, product} = props;

	/** @todo 선색상 후size 이후 추가 함수 */

	/** 
	 * 장바구니에 상품 추가 기능
	 * @todo 중복삽입 방지 필요 + 성공 여부 툴팁으로 표시
	*/
	function addCartList() {
		let cartList = Cookies.get('cart');

		if(!cartList) {cartList = [];
		} else {cartList = JSON.parse(cartList);}

		try {
			cartList.push({prodNo: product.prodNo, index: 0});
			Cookies.set('cart', JSON.stringify(cartList), { expires: 7 });
		} catch (error) {
			alert("장바구니에 추가되지 않았습니다");
		}
		alert("장바구니에 추가되었습니다");
	}

	return(<>
		<Modal show={showDetail} onHide={() => {setShowDetail(false)}} size="xl" dialogClassName="one-product" animation={false} keyboard>
			<Modal.Header closeButton />
			<Modal.Body className="prod-detail">
				<section className="prod-imgs">
					<picture className="prod-main-img">
						<img src="" alt="상품 이미지" />
					</picture>
					<picture className="prod-sub-img">
						{/* 유동적 생성 요소 */}
						<img src="" alt="세부 상품 이미지" />
					</picture>
				</section>
				<section className="prod-other">
					<h4 style={{fontWeight: "bold"}}>{product.prodName}</h4>
					<p>{product.prodCap}</p>
					<article className="prod-price">
						<h5>50,000</h5>
						<h4><pre> → </pre>30,000</h4>
					</article>
					<article className="prod-colors">
						{/* 유동적 생성 요소 */}
						<label htmlFor="asdf" style={{backgroundColor: "blue"}} />
						<input type="radio" name="???" id="xxx" hidden />
					</article>
					<article className="prod-sizes">
						{/* 유동적 생성 요소 */}
						<label htmlFor="asdf" className="btn btn-secondary">zxcv</label>
						<input type="radio" name="¿¿¿" id="yyy" hidden />
					</article>
					<ul className="prod-receipt">
						<h3>선택 상품</h3>
						{/* 유동적 생성 요소 */}
						<li>
							{/* (색상) (사이즈) */}
							<span>색깔 XS</span>
							<input type="number" name="" id="" />
							{/* (가격)원 */}
							<span></span>
						</li>
					</ul>
					<article className="prod-total">
						<h5>총 금액</h5>
						<h4>12,345 원</h4>
					</article>
					<article className="order-action">
						<button className="btn btn-secondary" onClick={addCartList}>장바구니 담기</button>
						<button className="btn btn-dark">구매하기</button>
					</article>
				</section>
			</Modal.Body>
			<Modal.Body>
				<h3>여기는 채팅~</h3>
			</Modal.Body>
		</Modal>
	</>);
}