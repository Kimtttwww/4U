import { Modal, Overlay, Tooltip } from "react-bootstrap";
import "../css/product/ProdDetail.css"
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { number } from "prop-types";
import ProdReview from "../page/product/ProdReview";

/**
 * 상품 상세 모달창
 * @props props
 * 	@param {boolean} showDetail 상품 상세 모달창의 표시 여부 state
 * 	@param {function} setShowDetail 상품 상세 모달창의 표시 여부 state's setter fn
 * 	@param {object} product 상품 상세 모달창에 보여줄 상품 state
 * 	@param {function} priceConverter 숫자형 가격 값을 ','가 포함된 문자형 값으로 변환해주는 fn
 * 	@param {function} checkDiscount 할인 유무에 따른 가격 포맷 적용 fn
 */
export default function ProdDetail(props) {
	
	const {showDetail, setShowDetail, product, priceConverter, checkDiscount} = props;
	const [selectProd, setSelectProd] = useState({});
	const [prodBuyList, setProdBuyList] = useState([]);
	const [sizeList, setSizeList] = useState([]);
	const [showTooltip, setShowTooltip] = useState(false);
	const [subImgList, setSubImgList] = useState([]);
	const mainImage = useRef();
	const cartBtn = useRef();


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
		setSubImgList(product.image.filter((img) => (img.imgType === 2 && img.colorNo === colorNo)));
	}
	
	/**
	 * 색상 선택시 해당 색상 상품의 사이즈를 보여주는 fn
	 * @returns 해당 색상의 상품 사이즈들을 표현하는 태그들
	 */
	function addSizeList() {
		let element;

		if(sizeList?.length) {
			element = sizeList.map((dtl) => (<span className="btn btn-secondary" onClick={addBuyList}>{dtl.size}</span>))
		} else {element = (<h6>색상을 선택해주세요</h6>);}
		
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
	 * count 증감 동작
	 * @param {number} index 증감시킬 상품의 옵션
	 * @param {number} step 증감값(1, -1)
	*/
	function upDownCount(index, step) {
		const target = prodBuyList.find((dtl) => dtl.index === index, 1);
		
		if(step < 0 && target.count === 1) {
			prodBuyList.splice((dtl) => dtl.index === index, 1);
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
	 * 장바구니에 상품 추가 fn
	 */
	function addCartList() {
		if(!prodBuyList.length) {
			alert("상품을 선택해주세요");
			return;
		}
		let cartList = Cookies.get('cart');

		try {
			if(!cartList) {
				cartList = [];
			} else {
				cartList = JSON.parse(cartList);
				prodBuyList?.forEach((dtl) => {cartList = cartList.filter((prod) => (prod.prodNo != dtl.prodNo) && (prod.index != dtl.index));});
			}

			cartList.push(...prodBuyList);
			Cookies.set('cart', JSON.stringify(cartList), { expires: 7 });
		} catch (error) {
			alert("장바구니에 추가되지 않았습니다");
		}
		setShowTooltip(true);
		setTimeout(() => {setShowTooltip(false);}, 1500);
	}

	/**
	 * 상세 이미지에 커서 올리면 크게 보여주는 fn
	 * @param {SyntheticBaseEvent} e 이벤트 객체
	 */
	function changeImageToSubImg(e) {mainImage.current.src = subImgList.find((img) => img.imgNo == e.target.id)?.imgName}

	/**
	 * 바뀌었던 이미지를 다시 원래 이미지로 되돌리는 fn
	 */
	function rollbackMainImage() {mainImage.current.src = product.image.find((img) => img.imgType === 1)?.imgName}

	/**
	 * 상품 상세창 표시 이전 밑작업
	 * (최근 본 상품 설정 및 상품 서브 이미지 설정)
	 */
	function setRecentProduct() {
		let recentProduct = Cookies.get('recentProduct');
		
		if(recentProduct){recentProduct = [product.prodNo, ...JSON.parse(recentProduct)].slice(0, 3)
		} else {recentProduct = [product.prodNo]}
		
		Cookies.set('recentProduct', JSON.stringify(recentProduct));
		setSubImgList(product.image.filter((img) => (img.imgType === 2)));
	}

	return(<>
		<Modal show={showDetail} onHide={() => {setShowDetail(false); setSizeList({}); setProdBuyList([]);}} size="xl" 
			onShow={setRecentProduct} dialogClassName="one-product" animation={false} keyboard>
			<Modal.Header closeButton />
			<Modal.Body className="prod-detail">
				<section className="prod-imgs">
					<picture className="prod-main-img">
						<img ref={mainImage} src={product.image.find((img) => img.imgType === 1)?.imgName} alt="주 상품 이미지" />
					</picture>
					<picture className="prod-sub-img">
						{subImgList?.length && subImgList.map((img, i) => (i < 4 ? (<img id={img.imgNo} src={img.imgName}
						 	alt={(i + 1) + "번 상세 상품 이미지"} onMouseEnter={changeImageToSubImg} onMouseLeave={rollbackMainImage} />) : "") ) }
					</picture>
				</section>
				<section className="prod-other">
					<h4 style={{fontWeight: "bold"}}>{product.prodName}</h4>
					<p>{product.prodCap}</p>
					<article className="prod-colors">{colorList()}</article>
					<article className="prod-price">{checkDiscount(product)}</article>
					<article className="prod-sizes">{addSizeList()}</article>
					<ul className="prod-receipt">
						<h3>선택 상품</h3>
						{prodBuyList && prodBuyList.map((dtl, i) => (
							<li key={dtl.index}>
								<span>{dtl.colorName} {dtl.size} {product.prodName}</span>
								<span className="prod-count">
									<span onClick={() => {upDownCount(dtl.index, -1)}}>&lt;</span>
									<input type="number" name="count" value={dtl.count} readOnly />
									<span onClick={() => {upDownCount(dtl.index, 1)}}>&gt;</span>
								</span>
								<span onClick={() => {subProdBuyList(dtl.index)}}>X</span>
							</li>
						)) }
					</ul>
					<article className="prod-total">
						<h5>총 금액</h5>
						<h4>{prodBuyList.length ? calcPrice() : ""} 원</h4>
					</article>
					<article className="order-action">
						<button ref={cartBtn} className="btn btn-secondary" onClick={addCartList}>장바구니 담기</button>
						<Overlay target={cartBtn} show={showTooltip} placement="top">
							{(props) => (<Tooltip {...props}>장바구니에 추가되었습니다</Tooltip>)}
						</Overlay>
					</article>
				</section>
			</Modal.Body>
			<Modal.Body className="prod-review">
				<ProdReview prodNo={product.prodNo} />
			</Modal.Body>
		</Modal>
	</>);
}