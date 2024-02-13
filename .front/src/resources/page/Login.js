import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import "../css/Login.css";

export default function Login() {

	const [modal, setModal] = useState(false);

	// inputs[0].oninvalid = function () {this.setCustomValidity('아이디를 입력해주세요');}
	// inputs[0].oninput = function () {this.setCustomValidity('');}
	// inputs[1].oninvalid = function () {this.setCustomValidity('비밀번호를 입력하세요');}
	// inputs[1].oninput = function () {this.setCustomValidity('');}
	
	// window.onkeydown = (e) => {
	// 	if(e.getModifierState("CapsLock")) {    
	// 		inputs[1].setCustomValidity('CapsLock이 켜져 있습니다');
	// 		inputs[1].reportValidity();
	// 	} else {
	// 		inputs[1].setCustomValidity('');
	// 	}
	// };

	//require('react-dom');
	//window.React2 = require('react');
	//console.log("duple test",window.React1 === window.React2);

	return(
		<>
			<Button variant="primary" onClick={() => setModal(true)}>모달 테스트</Button>
			<Modal show={modal} onHide={() => setModal(false)} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>로그인</Modal.Title>
				</Modal.Header>
				<Modal.Body className="content-box" style={{flexDirection: "column"}}>
					<div className="content-box">
						<div className="inputs-box">
							<input type="text" name="memberId" className="login-font form-control" placeholder="ID" required />
							<input type="password" name="memberPwd" className="login-font form-control" placeholder="PW" required />
						</div>
						<button className="login-btn login-font btn btn-primary">Log in</button>
					</div>
					<div style={{padding: "0 5px"}}>
						{/* 나중에 아이디, 비번 찾기 혹은 아이디 저장 기능 */}
						<input type="checkbox" id="isRememberId" className="form-check-input" />
						<label htmlFor="isRememberId" className="form-label">아이디 저장</label>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}