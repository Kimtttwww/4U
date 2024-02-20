import { Modal } from "react-bootstrap";
import "../css/product/ProdDetail.css"
import Cookies from "js-cookie";

/**
 * 상품 상세 모달창
 * @props props
 * 	@param {boolean} showDetail 상품 상세 모달창의 표시 여부 state
 * 	@param {function} setShowDetail 상품 상세 모달창의 표시 여부 state's setter fn
 * 	@param {object} product 상품 상세 모달창에 보여줄 상품 state
 * 	@param {function} priceConverter 숫자형 가격 값을 ','가 포함된 문자형 값으로 변환해주는 fn
 */
export default function ProdDetail(props) {
	
	const {showDetail, setShowDetail, product, priceConverter} = props;

	/**
	 * @todo 선색상 후size 이후 추가 함수
	 */
	function buyList() {
		
	}

	/** 
	 * 장바구니에 상품 추가 기능
	 * @todo 중복삽입 방지 필요 + 성공 여부 툴팁으로 표시
	*/
	function addCartList() {
		let cartList = Cookies.get('cart');

		if(!cartList) {cartList = [];
		} else {cartList = JSON.parse(cartList);}

		try {
			cartList.push({prodNo: product.prodNo, index: product.detail[0].index});
			Cookies.set('cart', JSON.stringify(cartList), { expires: 7 });
		} catch (error) {
			alert("장바구니에 추가되지 않았습니다");
		}
		alert("장바구니에 추가되었습니다");
	}

	/**
	 * 할인 유무에 따른 가격표현 태그 
	 * @param {number} discountRate 해당 물품의 할인율
	 * @param {number} product 해당 물품
	 * @returns {React.JSX.Element} 
	 */
	function checkDiscount(product) {
		let element;

		if(product.discountRate) {
			let saledPrice = product.price * (100 - product.discountRate) / 100;
			element = (<>
				<h5>{priceConverter(product.price)}</h5>
				<h4><pre> → </pre>{priceConverter(saledPrice)}</h4>
			</>);
		} else {element = (<h4>{product.price}</h4>);}

		return element;
	}

	/**
	 * 상품별 색상 종류 표시
	 * @returns 사진 중 중복 색상을 제거한 후 남은 단일한 색상을 반환
	 */
	function colorList() {
		let arr:Set<number> = new Set(product.detail.map((dtl) => dtl.colorNo));
		let imgList = [];
		
		for (let i = 0; i < product.image.length; i++) {
			let img = product.image[i];
			if(arr.has(img.colorNo)) {
				imgList.push(img);
				arr.delete(img.colorNo);
			}
			if(!arr.size) break;
		}
		
		return (
			imgList.map((img) => {
				let {rgb} = img;
				return (<span style={{backgroundColor: rgb}}></span>);
			})
		);
	}
		
	/**
	 * 상품별 사이즈 종류 표시
	 * @returns 사진 중 중복 사이즈을 제거한 후 남은 단일한 사이즈를 반환
	 * @todo 작업 해야함
	*/
	function sizeList() {
		let arr:Set<String> = new Set(product.detail.map((dtl) => dtl.size));

		return ([...arr].map((size) => (<span className="btn btn-secondary">{size}</span>)));
	}
		
	/**
	 * 색깔에 커서 올리면 해당 색깔의 상품 이미지가 나오게 하는 fn
	 * @param {SyntheticBaseEvent} e 이벤트 객체
	 * @param {number} prodNo 해당 상품 번호
	 * @todo 로컬라이징 필요 + 이벤트 발생 요소 변경 + 부모요소 선택 확인 필요
	*/
	// function changeImageToColor(e, prodNo) {
	// 	const imgNo = Number(e.target.innerHTML);
	// 	const prod = prodList.find((p) => p.prodNo === prodNo);
		
	// 	// console.log(prod.image.find((img) => img.imgNo === imgNo));
		
	// 	e.target.parentElement.parentElement.previousSibling.src = prod.image.find((img) => img.imgNo === imgNo).imgName;
	// }
	
	/**
	 * 바뀌었던 이미지를 다시 원래 썸넬로 되돌리는 fn
	 * @param {SyntheticBaseEvent} e 이벤트 객체
	 * @param {number} prodNo 해당 상품 번호
	 * @todo 로컬라이징 필요 + 이벤트 발생 요소 변경 + 부모요소 선택 확인 필요
	 */
	// function rollbackImage(e, prodNo) {
	// 	const prod = prodList.find((p) => p.prodNo === prodNo);

	// 	e.target.parentElement.parentElement.previousSibling.src = prod.image.find((img) => img.imgType === 1)?.imgName;
	// }

	console.log("product\n", product);
	return(<>
		<Modal show={showDetail} onHide={() => {setShowDetail(false)}} size="xl" dialogClassName="one-product" animation={false} keyboard>
			<Modal.Header closeButton />
			<Modal.Body className="prod-detail">
				<section className="prod-imgs">
					<picture className="prod-main-img">
						<img src={product.image.find((img) => img.imgType === 1)?.imgName} alt="상품 이미지" />
					</picture>
					<picture className="prod-sub-img">
						{/* 유동적 생성 요소(거의 불가능?) */}
						<img src="" alt="세부 상품 이미지" />
					</picture>
				</section>
				<section className="prod-other">
					<h4 style={{fontWeight: "bold"}}>{product.prodName}</h4>
					<p>{product.prodCap}</p>
					<article className="prod-price">{checkDiscount(product)}</article>
					<article className="prod-colors">{colorList()}</article>
					<article className="prod-sizes">{sizeList()}</article>
					<ul className="prod-receipt">
						<h3>선택 상품</h3>
						{/* 유동적 생성 요소 */}
						<li>
							{/* (색상) (사이즈) */}
							<span>색깔 XS</span>
							<span className="prod-count">
								<span>&lt;</span>
								<input type="number" name="count" value={1} readOnly />
								<span>&gt;</span>
							</span>
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
				<h3>여기는 리뷰~</h3>
			</Modal.Body>
		</Modal>
	</>);
}