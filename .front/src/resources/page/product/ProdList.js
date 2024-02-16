import { useEffect, useState } from "react";
import "../../css/product/ProdList.css";
import ProdDetail from "../../modal/ProdDetail";
import axios from "axios";

/** 상품 리스트 페이지 */
export default function ProdList() {
	
	const [prodList, setProdList] = useState([{}]);
	const [showDetail, setShowDetail] = useState(false);
	const [product, setProduct] = useState({});

	useEffect(() => {
		axios.get("/product/list")
		.then((result) => {
			setProdList(result.data);
		}).catch(console.log);
	}, []);
	
	function gotoProdDetail(prodNo) {
		setProduct(prodList.find((prod) => prod.prodNo == prodNo));
		setShowDetail(true);
	}

	return(<>
		<div className="ProdList">
			<div className="menu-side-area">
				<h1>메뉴영역?</h1>
			</div>
			<div className="products">
				{prodList.length && prodList.map((prod) => {
					return(<>
						<section key={prod.prodNo} className="product" onClick={() => gotoProdDetail(prod.prodNo)}>
							<img src="" alt="상품 이미지" className="prod-img" />
							<article>
								<div>{prod.price}</div>
								<div>{prod.prodName}</div>
								<div className="prod-color">
									{/* 색깔(능동적 생성) */}
									<span style={{backgroundColor: "chartreuse"}}></span>
								</div>
								<div>★⭐🌟✨❤🧡💗💛💘💕💖</div>
							</article>
						</section>
					</>);
				} ) }
			</div>
		</div>

		<ProdDetail showDetail={showDetail} setShowDetail={setShowDetail} product={product} />
	</>);
}