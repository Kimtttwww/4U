import { Modal } from "react-bootstrap";
import "../css/product/ProdDetail.css"

/**
 * 상품 상세 모달창
 * @props props
 * 	@param {boolean} showDetail 상품 상세 모달창의 표시 여부 state
 * 	@param {function} setShowDetail 상품 상세 모달창의 표시 여부 state's setter fn
 */
export default function ProdDetail(props) {
	
	const {showDetail, setShowDetail} = props;

	/** @todo 선색상 후size 함수 */

	return(<>
		<Modal show={showDetail} onHide={() => {setShowDetail(false)}} size="xl" dialogClassName="one-product" animation={false} scrollable keyboard>
			<Modal.Header closeButton />
			<Modal.Body className="prod-detail">
				<section className="prod-imgs">
					<picture className="prod-main-img">
						<img src="" alt="상품 이미지" />
					</picture>
					<picture className="prod-sub-img">
						{/* 유동적 생성 */}
						<img src="" alt="세부 상품 이미지" />
					</picture>
				</section>
				<section className="prod-other">
					<h3>이거슨 상품명!!!이거슨 상품명!!!이거슨 상품명!!!이거슨 상품명!!!</h3>
					<p>상품설명! 나도 설명! 얼마나 될지 몰라! 아무튼 설명!
						설명!설명!설명!설명!설명!설명!설명!설명!설명!설명!
						설명!설명!설명!설명!설명!설명!설명!설명!설명!설명!
					</p>
					<article className="prod-price">
						<h5>50,000</h5>
						<h4><pre> → </pre>30,000</h4>
					</article>
					<article className="prod-colors">
						{/* 유동적 생성 */}
						<label htmlFor="asdf" style={{backgroundColor: "blue"}} />
						<input type="radio" name="???" id="xxx" hidden />
					</article>
					<article className="prod-sizes">
						{/* 유동적 생성 */}
						<label htmlFor="asdf" className="btn btn-secondary">zxcv</label>
						<input type="radio" name="¿¿¿" id="yyy" hidden />
					</article>
					<article className="prod-receipt">
						<h3>선택 상품</h3>
						<ul>
							<li>
								{/* (색상) (사이즈) */}
								<span></span>
								<input type="number" name="" id="" />
								{/* (가격)원 */}
								<span></span>
							</li>
						</ul>
					</article>
				</section>
			</Modal.Body>
		</Modal>
	</>);
}