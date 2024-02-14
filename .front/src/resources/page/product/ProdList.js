import { useState } from "react";
import "../../css/product/ProdList.css";

export default function ProdList() {
	
	const [prodList, setProdList] = useState([{}]);

	return(
		<>
			<div className="ProdList">
				<div className="menu-side-area">
					<h1>메뉴영역?</h1>
				</div>
				<div className="products">
					<h1>상품들</h1>
				</div>

			</div>
		</>
	);
}