import { Modal, Tooltip } from "react-bootstrap";

export default function ProdDetail(props) {
	
	const {showDetail, setShowDetail} = props;

	return(
		<>
			<Modal show={showDetail} onHide={() => {setShowDetail(false)}} size="lg" scrollable centered keyboard animation={false}>
				<Modal.Header closeButton />
				<Modal.Body style={{display: "flex", flexDirection: "column"}}>
					<h1>무야호!</h1>
					<Tooltip style={{zIndex: "5000 !important"}}>asdfg</Tooltip>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
					<h1>무야호!</h1>
				</Modal.Body>
			</Modal>
		</>
	);
}