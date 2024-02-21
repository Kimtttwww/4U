import { Modal } from "react-bootstrap";
import "../css/product/ProdDetail.css"
import Cookies from "js-cookie";
import { useState } from "react";

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
	const [selectProd, setSelectProd] = useState({});
	const [prodBuyList, setProdBuyList] = useState([]);
	const [sizeList, setSizeList] = useState([]);

	/**
	 * 할인 유무에 따른 가격 포맷 적용 fn
	 * @param {number} product 해당 물품
	 * @returns {React.JSX.Element} 할인 유무를 적용하고 ,도 적용한 가격을 표현하는 태그들
	*/
	function checkDiscount(product) {
		let element;
		
		if(product.discountRate) {
			let saledPrice = product.price * (100 - product.discountRate) / 100;
			element = (<>
				<h5>{priceConverter(product.price)}</h5>
				<h4><pre> → </pre>{priceConverter(saledPrice)}&nbsp; <asdf>{product.discountRate}%</asdf></h4>
			</>);
		} else {element = (<h4>{product.price}</h4>);}

		return element;
	}

	/**
	 * 상품별 색상 종류 표시 fn
	 * @returns 해당 상품의 색상들을 표현하는 태그들
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
				let {colorNo, rgb} = img;
				return (<span onClick={filteringSizeList} style={{backgroundColor: rgb, color: rgb}}>{colorNo}</span>);
			})
		);
	}

	/**
	 * 색상 선택시 해당 색상 상품의 사이즈를 보여주기 위한 밑작업 fn
	 * @param {SyntheticBaseEvent} e 해당 상품이 가진 색상 중 선택한 색상의 요소에서 발생한 이벤트
	 */
	function filteringSizeList(e) {
		const colorNo = Number(e.target.innerHTML);
		const prod = product.detail.filter((dtl) => dtl.colorNo === colorNo);

		setSizeList(prod);
		setSelectProd({prodNo: product.prodNo});
	}

	/**
	 * 색상 선택시 해당 색상 상품의 사이즈를 보여주는 fn
	 * @returns 해당 색상의 상품 사이즈들을 표현하는 태그들
	 */
	function addSizeList() {
		let element;

		if(sizeList?.length) {
			element = sizeList.map((dtl) => (<span className="btn btn-secondary" onClick={addBuyList}>{dtl.size}</span>))
		} else {element = (<h5>색상을 선택해주세요</h5>);}

		return element;
	}

	/**
	 * 선색상 후size 선택 이후 선택 상품에 추가하는 fn
	 * @param {SyntheticBaseEvent} e 색상선택 후 선택한 사이즈 요소에서 발생한 이벤트
	 */
	function addBuyList(e) {
		const size = e.target.innerHTML;
		let detail = sizeList?.find((dtl) => dtl.size == size)
		
		selectProd.index = detail.index;
		selectProd.size = size;
		selectProd.colorName = detail.colorName;
		selectProd.count = 1;

		if(prodBuyList.find((dtl) => dtl.index === selectProd.index)) {
			alert("이미 선택한 상품입니다");
			return;
		}

		setProdBuyList([...prodBuyList, selectProd]);
		setSelectProd({});
		setSizeList([]);
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

	/**
	 * count 증감 동작
	 * @param {number} index 증감시킬 상품의 옵션
	 * @param {number} step 증감값(1, -1)
	*/
	function upDownCount(index, step) {
		const target = prodBuyList.find((dtl) => dtl.index === index, 1);
		
		if(step < 0 && target.count === 1) {
			prodBuyList.splice((dtl) => dtl.index === index);
			setProdBuyList([...prodBuyList]);
			return;
		}
		
		target.count += step;
		setProdBuyList([...prodBuyList]);
	}
	
	/**
	 * 선택 상품에서 제거하는 fn
	 * @param {number} index 제거시킬 상품의 옵션
	*/
	function subProdBuyList(index) {
		prodBuyList.splice((dtl) => dtl.index === index, 1);
		console.log("index", index);
		console.log("prodBuyList", prodBuyList);
		setProdBuyList([...prodBuyList]);
	}

	/**
	 * 선택 상품 추가시 총 금액 계산해주는 fn
	 * @returns 총금액을 ,로 표현한 문자열 값
	 */
	function calcPrice() {
		let totalPrice :number | string = 0;
		const price = product.discountRate ? product.price * (100 - product.discountRate) / 100 : product.price;

		prodBuyList.forEach((dtl) => {totalPrice += price * dtl.count;});

		let back = totalPrice % 1000;
		totalPrice = Math.floor(totalPrice / 1000) + "," + (back < 100 ? (back < 10 ? (back < 1 ? "000" : "00" + back) : "0" + back) : back);
		return totalPrice;
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
			cartList.push(...prodBuyList);
			Cookies.set('cart', JSON.stringify(cartList), { expires: 7 });
		} catch (error) {
			alert("장바구니에 추가되지 않았습니다");
		}
		alert("장바구니에 추가되었습니다");
	}
	
	test = prodBuyList;
	return(<>
		<Modal show={showDetail} onHide={() => {setShowDetail(false); setSizeList({}); setProdBuyList([]);}} size="xl" dialogClassName="one-product" animation={false} keyboard>
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
					<article className="prod-sizes">{addSizeList()}</article>
					<ul className="prod-receipt">
						<h3>선택 상품</h3>
						{/* 유동적 생성 요소 */
							prodBuyList && prodBuyList.map((dtl, i) => {
								return(
									<li key={dtl.index}>
										<span>{dtl.colorName} {dtl.size}</span>
										<span className="prod-count">
											<span onClick={() => {upDownCount(dtl.index, -1)}}>&lt;</span>
											<input type="number" name="count" value={dtl.count} readOnly />
											<span onClick={() => {upDownCount(dtl.index, 1)}}>&gt;</span>
										</span>
										<span onClick={() => {subProdBuyList(dtl.index)}}>X</span>
									</li>
								);
							})
						}
					</ul>
					<article className="prod-total">
						<h5>총 금액</h5>
						<h4>{prodBuyList.length ? calcPrice() : ""} 원</h4>
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