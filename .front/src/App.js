import { Route, Routes } from "react-router-dom";
import BuyerMyPage from "./resources/page/BuyerMyPage";
import OrderPage from "./resources/page/order/OrderPage";
import Mainpage from "./resources/page/mainpage";
import SignUp from "./resources/page/signUp";
import Header from "./resources/page/Header";
import { useState } from "react";
import Login from "./resources/page/member/Login";
import ProdList from "./resources/page/product/ProdList";

function App() {
	
	const [showLogin, setShowLogin] = useState(false);

	return (
		<div className="App">
			<Header setShowLogin={setShowLogin} />
			<Routes>
				{/* 메인 페이지 */}
				<Route path="/" element={<Mainpage />} />

				{/* 회원 관련 */}
				<Route path="/member">
					{/* 회원가입 페이지 */}
					<Route path="signUp" element={<SignUp />} />
				</Route>

				{/* 제품 관련 */}
				<Route path="/product">
					<Route path="list" element={<ProdList />} />
				</Route>

				{/* ? */}
				<Route path="/orderPage" element={<OrderPage />} />

				{/* ? */}
				<Route path="/buyer/mypage/" element={<BuyerMyPage />} /> 

				{/* 그 외의 에러 페이지 */}
				<Route path="*" element={
					<h1>404! 아마도 당신은 에러일 겁니다 404!</h1>
				} />
			</Routes>

			{/* 로그인 페이지 */}
			<Login showLogin={showLogin} setShowLogin={setShowLogin} />
		</div>
	);
}

export default App;
