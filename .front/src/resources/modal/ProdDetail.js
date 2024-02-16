import { Modal } from "react-bootstrap";
import "../css/product/ProdDetail.css"

export default function ProdDetail(props) {
	
	const {showDetail, setShowDetail} = props;

	return(<>
		<Modal show={showDetail} onHide={() => {setShowDetail(false)}} size="xl" dialogClassName="one-product" animation={false} scrollable keyboard>
			<Modal.Header closeButton />
			<Modal.Body className="prod-detail">
				<section className="prod-imgs">
					<picture className="prod-main-img">
						<img src="" alt="상품 이미지" />
					</picture>
					<picture className="prod-sub-img">
						<img src="" alt="세부 상품 이미지" />
						<img src="" alt="세부 상품 이미지" />
						<img src="" alt="세부 상품 이미지" />
					</picture>
				</section>

				<section className="prod-other">
					<h2>이거슨 상품명!!!이거슨 상품명!!!이거슨 상품명!!!이거슨 상품명!!!</h2>
				</section>
			

			</Modal.Body>
		</Modal>
	</>);
}