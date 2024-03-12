/**
 * 할인 유무에 따른 가격 포맷 적용 fn
 * @param {number} product 해당 물품
 * @returns {React.JSX.Element} 할인 유무를 적용하고 ,도 적용한 가격을 표현하는 태그들
*/
export function checkDiscount(product) {
	let element;

	if (product.discountRate) {
		let saledPrice = product.price * (100 - product.discountRate) / 100;
		element = (<>
			<span>\{(Math.floor(saledPrice / 10) * 10).toLocaleString()}</span> &nbsp;
			<span style={{ color: "red", textDecoration: "line-through"}}>\{product.price.toLocaleString()}</span>
		</>);
	} else { element = (<span>\{product.price.toLocaleString()}</span>); }

	return element;
}