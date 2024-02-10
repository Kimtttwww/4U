<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
* {
	box-sizing: border-box;
}

input {
    width: 350px;
    height: 50px;
    margin: 5px 5px;
    padding: 0 5px;
}

.login-form {
    width: 600px;
    text-align: center;
    border: 1px solid black;
    margin: auto;
}

/* 요소들 가운데 오밀조밀 */
.content-box {
    width: fit-content;
    display: flex;
    margin: 0 auto;
}

/* input 정렬 박스 */
.inputs-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#login-btn {
    width: 100px;
    margin: 5px 5px;
}

.login-font {
	font-size: 17px;
}
</style>
</head>
<body>
	<form class="login-form" action="/" method="post">
		<h1>로그인</h1>
		<div class="content-box">
			<div class="inputs-box">
				<input type="text" name="memberId" class="login-font" placeholder="ID" required>
				<input type="password" name="memberPwd" class="login-font" placeholder="PW" required>
				<div><!-- 나중에 아이디, 비번 찾기 혹은 아이디 저장 기능 --></div>
			</div>
			<button id="login-btn" class="login-font">Log in</button>
		</div>
	</form>
	<script type="text/javascript">
		const inputs = document.querySelectorAll("input");
		inputs[0].oninvalid = function () {this.setCustomValidity('아이디를 입력해주세요');}
		inputs[0].oninput = function () {this.setCustomValidity('');}
		inputs[1].oninvalid = function () {this.setCustomValidity('비밀번호를 입력하세요');}
		inputs[1].oninput = function () {this.setCustomValidity('');}
		
		window.onkeydown = (e) => {
		    if(e.getModifierState("CapsLock")) {    
		    	inputs[1].setCustomValidity('CapsLock이 켜져 있습니다');
			    inputs[1].reportValidity();
		    } else {
		    	inputs[1].setCustomValidity('');
		    }
		};
	</script>
</body>
</html>