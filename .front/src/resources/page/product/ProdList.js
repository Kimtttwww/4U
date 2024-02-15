import { useState } from "react";
import "../../css/product/ProdList.css";
import ProdDetail from "../../modal/ProdDetail";

/** 상품 리스트 페이지 */
export default function ProdList() {
	
	const [prodList, setProdList] = useState([{}]);
	const [showDetail, setShowDetail] = useState(false);

	return(<>
		<div className="ProdList">
			<div className="menu-side-area">
				<h1>메뉴영역?</h1>
			</div>
			<div className="products">
				<section className="product" onClick={() => setShowDetail(true)}>
					<img src="" alt="상품 이미지" className="prod-img" />
					<article>
						<div>10만원 to 만원</div>
						<div>상품이름~<br />
							상품이름~
						</div>
						<div className="prod-color">
							{/* 색깔(능동적 생성) */}
							<span style={{backgroundColor: "chartreuse"}}></span>
						</div>
						<div>★⭐🌟✨❤🧡💗💛💘💕💖</div>
					</article>
				</section>
			</div>
		</div>

		<ProdDetail showDetail={showDetail} setShowDetail={setShowDetail} />
	</>);
}