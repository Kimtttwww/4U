import { useEffect, useState } from "react";
import "../../css/product/ProdList.css";
import ProdDetail from "../../modal/ProdDetail";
import axios from "axios";
import Rightmenubar from "../../components/Rightmenubar";
import qs from 'qs';
/**
 * 상품 리스트 페이지
 * @props props 객체형태로 제시된 리스트 필터 요소
 * 	@param {string | number} () cateMain, cateSub, size, color, seeThrough, ...
 */
export default function ProdList() {
	
	const [prodList, setProdList] = useState([]);
	const [showDetail, setShowDetail] = useState(false);
	const [product, setProduct] = useState();

	// useEffect(() => {
	// 	// 상품 리스트 불러오기
	// 	axios.get("/product/list", category)
	// 	.then((result) => {
	// 		setProdList(result.data);
	// 	}).catch((error) => {
	// 		console.log(error);
	// 		alert("상품을 불러오는 중 문제가 발생했습니다");
	// 	});
	// }, []);


const api = axios.create({
  paramsSerializer: function(params) {
    return qs.stringify(params, {arrayFormat: 'repeat'})
  }
});

// ...

useEffect(() => {
  let selectedItems = JSON.parse(sessionStorage.getItem("selectedItems"));
  console.log(selectedItems);

  api.get("/product/list", {
    params: selectedItems
  })
  .then((result) => {
    setProdList(result.data);
  }).catch((error) => {
    console.log(error);
    alert("상품을 불러오는 중 문제가 발생했습니다");
  });
}, []);
	
	/**
	 * 상세페이지에 필요한 값 세팅
	 * @param {number} prodNo
	 */
	function gotoProdDetail(prodNo) {
		setProduct(prodList.find((prod) => prod?.prodNo === prodNo));
		setShowDetail(true);
	}

	/**
	 * 상품별 색상 종류 표시
	 * @returns 사진 중 중복 색상을 제거한 후 남은 단일한 색상을 반환
	 */
	function colorList(prod) {
		let arr:Set<number> = new Set(prod.detail.map((dtl) => dtl.colorNo));
		let imgList = [];

		for (let i = 0; i < prod.image.length; i++) {
			let img = prod.image[i];
			if(arr.has(img.colorNo)) {
				imgList.push(img);
				arr.delete(img.colorNo);
			}
			if(!arr.size) break;
		}
		
		return (
			imgList.map((img) => {
				let {imgNo, refNo, rgb} = img;
				return (<span onMouseEnter={(e) => changeImageToColor(e, refNo)} onMouseLeave={(e) => rollbackImage(e, refNo)}
					style={{backgroundColor: rgb, color: rgb}}>{imgNo}</span>);
			})
		);
	}
	
	/**
	 * 색깔에 커서 올리면 해당 색깔의 상품 이미지가 나오게 하는 fn
	 * @param {SyntheticBaseEvent} e 이벤트 객체
	 * @param {number} prodNo 해당 상품 번호
	*/
	function changeImageToColor(e, prodNo) {
		const imgNo = Number(e.target.innerHTML);
		const prod = prodList.find((p) => p.prodNo === prodNo);
		
		e.target.parentElement.parentElement.previousSibling.src = prod.image.find((img) => img.imgNo === imgNo).imgName;
	}
	
	/**
	 * 바뀌었던 이미지를 다시 원래 썸넬로 되돌리는 fn
	 * @param {SyntheticBaseEvent} e 이벤트 객체
	 * @param {number} prodNo 해당 상품 번호
	 */
	function rollbackImage(e, prodNo) {
		const prod = prodList.find((p) => p.prodNo === prodNo);

		e.target.parentElement.parentElement.previousSibling.src = prod.image.find((img) => img.imgType === 1)?.imgName;
	}

	/**
	 * 숫자형 가격 값을 ','가 포함된 문자형 값으로 변환해주는 fn
	 * @param {number} num 숫자형 가격 값
	 * @returns {string} ','가 포함된 문자형 숫자 값
	 */
	function priceConverter(num) {
		let str = num.toString()
		let numArr = []
		for (let i = 0; i < Math.ceil(str.length / 3); i++) {
			numArr.push(str?.charAt(str.length - 3 - i * 3) + str?.charAt(str.length - 2 - i * 3) + str?.charAt(str.length - 1 - i * 3))
		}
  
		return numArr.reverse().toString();
  }

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
				<span>\{priceConverter(saledPrice)}</span>
				<span>\{priceConverter(product.price)}</span>
			</>);
		} else {element = (<span>\{priceConverter(product.price)}</span>);}

		return element;
	}

	return(<>
		<div className="ProdList">
			<div className="menu-side-area">
				<h1>메뉴영역?</h1>
			</div>
			<div className="products">
				{prodList?.length ? prodList.map((prod) => {
					return(<>
						<section key={prod.prodNo} className="product" onClick={() => gotoProdDetail(prod.prodNo)}>
							{/* 썸넬 사진을 찾아서 보여주기 */}
							<img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
							<article>
								{/* 이름이 가격 위에 있는게 좋을거같아서 올렸는데 맘에 안들면 내려 */}
								{/* 그리고 이름이 박스 사이즈 넘어가는 길이면 "페이크 레더 스탠드 카라 지퍼 바이커 자켓..." 으로 보이게 바꿨음 */}
								<div className="prod-name">{prod.prodName}</div>
								{/* 할인이 없는 상품은 price만 나와야 하고, 할인이 있는 상품은 price, discountRate 두개가 나와야함 */}
								{/* 가격에 3자리수 마다 "," 찍어주는거 해야함 */}
							<div className="prod-amount">
								
								{checkDiscount(prod)}
							</div>
								<div className="prod-color">
									{prod.image?.length && colorList(prod)}
								</div>
							</article>
						</section>
					</>);
				}) : <>
					<div style={{padding: "50px"}}>
						<h1>검색된 상품이 없습니다</h1>
					</div>
				</> }
			</div>
		</div>

	 	{product && <ProdDetail showDetail={showDetail} setShowDetail={setShowDetail} product={product} priceConverter={priceConverter} checkDiscount={checkDiscount} />}
	</>);
}