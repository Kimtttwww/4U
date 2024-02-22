import { useEffect, useRef, useState } from "react";
import "../css/member/Login.css";
import axios from "axios";
import { Modal, Overlay, Tooltip } from "react-bootstrap";

/**
 * 로그인 모달창 
 * @props props
 * 	@param {boolean} showLogin 로그인 모달창의 표시 여부 state
 * 	@param {function} setShowLogin 로그인 모달창의 표시 여부 state's setter fn
 * 	@param {function} setLogin 로그인 된 사용자 정보를 가지고 있는 state's setter fn
*/
export default function Login(props) {
	
	const {showLogin, setShowLogin, setLogin} = props;
	const [member, setMember] = useState({memberId: '', memberPwd: ''});
	const [showTooltip, setShowTooltip] = useState(false);
	const inputs = useRef([]);
	
	useEffect(() => {
		/**
		 * capsLock 확인
		 * @param {KeyboardEvent} e 
		*/
		const capsCheck = (e) => {
			if(inputs.current.length && inputs.current[1]) {
				if(e.getModifierState("CapsLock")) {    
					setShowTooltip(true);
				} else {
					setShowTooltip(false);
				}
			}
		};
		
		/**
		 * 아이디 / 비번 input에서 enter 확인
		 * @param {KeyboardEvent} e 
		*/
		const enterCheck = (e) => {
			if(e.key == "Enter") {login();}
		};
		
		window.addEventListener("keydown", capsCheck);
		if(inputs.current.length && inputs.current[1]) {
			inputs.current[0].addEventListener("keydown", enterCheck);
			inputs.current[1].addEventListener("keydown", enterCheck);
		}
		
		return () => {
			window.removeEventListener("keydown", capsCheck);
			if(inputs.current.length && inputs.current[1]) {
				inputs.current[0].removeEventListener("keydown", enterCheck);
				inputs.current[1].removeEventListener("keydown", enterCheck);
			}
		};
	}, [showLogin]);

	/** 
	 * 로그인 시도
	 */
	function login() {
		for (let i = 0; i < 2; i++) {
			member[inputs.current[i].name] = inputs.current[i].value;
		}
		
		setMember({...member});
		let {memberId, memberPwd, /* isRememberId */} = member;

		if(memberId && memberPwd) {
			axios.post("/member/login", member)
			.then((result) => {
				if(result.data) {
					const loginMember = JSON.stringify(result.data)
					sessionStorage.setItem('loginMember', loginMember);
					setLogin(result.data);
					setShowLogin(false);
				} else {
					setMember({memberId: '', memberPwd: ''});
					for (let i = 0; i < 2; i++) {inputs.current[i].value = "";}
					alert('잘못된 아이디 혹은 비밀번호 입니다');
				}
			}).catch((e) => {
				console.log(e);
				alert("서버와 통신에 실패했습니다");
			});
		} else {
			alert("입력이 충분하지 않습니다");
		}

		// 나중에 아이디 저장 기능
		// if(isRememberId) {
		// 	inputs.current[2].checked == true;
		// }
	}

	return(<>
		<Modal show={showLogin} onHide={() => setShowLogin(false)} backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>로그인</Modal.Title>
			</Modal.Header>
			<Modal.Body className="content-box" style={{flexDirection: "column"}}>
				<div className="content-box">
					<div className="inputs-box">
						<input type="text" name="memberId" className="login-font form-control" placeholder="ID"
						ref={(e) => {inputs.current[0] = (e)}} autoFocus required />
						<input type="password" name="memberPwd" className="login-font form-control" placeholder="PW"
						ref={(e) => {inputs.current[1] = (e)}} required />
						<Overlay target={inputs.current[1]} show={showTooltip} placement="bottom">
							{(props) => (
								<Tooltip {...props}>CapsLock이 켜져 있습니다</Tooltip>
							)}
						</Overlay>
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
	</>);
}