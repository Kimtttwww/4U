import { useEffect, useState } from "react";
import "../../css/product/ProdList.css";
import ProdDetail from "../../modal/ProdDetail";
import axios from "axios";

/** 상품 리스트 페이지 */
export default function ProdList() {
	
	const [prodList, setProdList] = useState([{}]);
	const [showDetail, setShowDetail] = useState(false);
	const [product, setProduct] = useState();

	useEffect(() => {
		// 상품 리스트 불러오기
		axios.get("/product/list")
		.then((result) => {
			setProdList(result.data);
			console.log(result.data);
		}).catch(console.log);
	}, []);
	
	// 상세페이지
	function gotoProdDetail(prodNo) {
		setProduct(prodList.find((prod) => prod?.prodNo == prodNo));
		setShowDetail(true);
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
							<img src={prod?.image?.find((img) => img.imgType === 1)?.imgName} alt="상품 이미지" className="prod-img" />
							<article>
								<div>{prod.price}</div>
								<div>{prod.prodName}</div>
								<div className="prod-color">
									{/* 색깔(능동적 생성) */
									prod.image?.length && prod.image.map((img) => {
										let {color} = img
										return (
										<>
											<span style={ {backgroundColor :  color }}></span>
										</>)
									}) 
									}
								</div>
								<div>★⭐🌟✨❤🧡💗💛💘💕💖</div>
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