import { useEffect, useState } from "react";
import "../../css/product/ProdList.css";
import ProdDetail from "../../modal/ProdDetail";
import axios from "axios";
import { useParams } from "react-router-dom";

/** 상품 리스트 페이지 */
export default function ProdList() {
	
	const [prodList, setProdList] = useState([]);
	const [showDetail, setShowDetail] = useState(false);
	const [product, setProduct] = useState();
	const {cateSub} = useParams();

	useEffect(() => {
		// 상품 리스트 불러오기
		axios.get("/product/list/" + cateSub)
		.then((result) => {
			setProdList(result.data);
			console.log(result.data);
		}).catch(console.log);
	}, []);
	
	/**
	 * 상세페이지에 필요한 값 세팅
	 * @param {number} prodNo
	 */
	function gotoProdDetail(prodNo) {
		setProduct(prodList.find((prod) => prod?.prodNo === prodNo));
		setShowDetail(true);
	}

	// console.log("test", prodList.sort((a, b) => a.price - b.price));

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
				return (<span onMouseEnter={(e) => test(e, refNo)} style={{backgroundColor: rgb, color: rgb}}>{imgNo}</span>);
			})
		);
	}
	
	/**
	 * 색깔에 커서 올리면 해당 색깔의 상품 이미지가 나오게 하는 함수
	 * @param {SyntheticBaseEvent} e 
	 */
	/**
	 * 
	 * @param {*} e 이벤트 객체
	 * @param {*} prodNo 해당 상품 번호
	 */
	function test(e, prodNo) {
		const imgNo = e.target.innerHTML;

		console.log(e.target);
		// console.log(prodList[prodNo]?.image?.find((img) => {img.imgNo === imgNo}));
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
							<img src={prod?.image?.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
							<article>
								<div>{prod.price}</div>
								<div>{prod.prodName}</div>
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

	 	{product && <ProdDetail showDetail={showDetail} setShowDetail={setShowDetail} product={product} />}
	</>);
}