import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import "../../css/member/Login.css";
import axios from "axios";

export default function Login(props) {
	
	const {showLogin, setShowLogin} = props;
	const [member, setMember] = useState({memberId: '', memberPwd: ''});
	const inputs = useRef([]);
	
	// window.onkeydown = (e) => {
	// 	if(e.getModifierState("CapsLock")) {    
	// 		pw.setCustomValidity('CapsLock이 켜져 있습니다');
	// 		pw.reportValidity();
	// 	} else {
	// 		pw.setCustomValidity('');
	// 	}
	// };

	// 로그인 시도
	function login() {
		for (let i = 0; i < 1; i++) {
			member[inputs.current[i].name] = inputs.current[i].value;
			console.log(inputs.current[i].value);
		}
		setMember({...member});
		
		console.table(inputs.current);
		let {memberId, memberPwd, isRememberId} = member;
		console.log(member);
		if(memberId && memberPwd) {
			axios.post("/member/login", member)
			.then((result) => {
				console.log(result);
				if(result.data) {
					sessionStorage.setItem('loginMember', JSON.stringify(result.data));
				} else {
					setMember({memberId: '', memberPwd: ''});
					for (let i = 0; i < 1; i++) {inputs.current[i].value = "";}
					alert('잘못된 아이디 혹은 비밀번호 입니다');
				}
			}).catch(console.log);
		}

		// 나중에 아이디 저장 기능
		// if(isRememberId) {
		// 	inputs.current[2].checked == true;
		// }
	}

	return(
		<>
			<Modal show={showLogin} onHide={() => setShowLogin(false)} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>로그인</Modal.Title>
				</Modal.Header>
				<Modal.Body className="content-box" style={{flexDirection: "column"}}>
					<div className="content-box">
						<div className="inputs-box">
							<input type="text" name="memberId" className="login-font form-control" placeholder="ID"
							ref={(e) => {inputs.current[0] = (e)}} required />
							<input type="password" name="memberPwd" className="login-font form-control" placeholder="PW"
							ref={(e) => {inputs.current[1] = (e)}} required />
						</div>
						<button className="login-btn login-font btn btn-primary" onClick={login}>Log in</button>
					</div>
					<div style={{padding: "0 5px"}}>
						{/* 나중에 아이디, 비번 찾기 혹은 아이디 저장 기능 */}
						<input type="checkbox" id="isRememberId" className="form-check-input" name="isRememberId" ref={(e) => {inputs.current[2] = (e)}} />
						<label htmlFor="isRememberId" className="form-label">아이디 저장</label>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}