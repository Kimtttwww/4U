
/**
 * 숫자형 가격 값을 ','가 포함된 문자형 값으로 변환해주는 fn
 * @param {number} num 숫자형 가격 값
 * @returns {string} ','가 포함된 문자형 숫자 값
 */
export function priceConverter(num) {
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
export function checkDiscount(product) {
	let element;

	if (product.discountRate) {
		let saledPrice = product.price * (100 - product.discountRate) / 100;
		element = (<>
			<span>\{priceConverter(saledPrice)}</span>
			<span>\{priceConverter(product.price)}</span>
		</>);
	} else { element = (<span>\{priceConverter(product.price)}</span>); }

	return element;
}