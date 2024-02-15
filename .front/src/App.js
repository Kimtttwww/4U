import { Route, Routes } from "react-router-dom";
import BuyerMyPage from "./resources/page/BuyerMyPage/BuyerMyPage";
import CartList from "./resources/page/BuyerMyPage/cart/CartList";
import Footer from "./resources/page/Footer";
import Header from "./resources/page/Header";
import Mainpage from "./resources/page/Mainpage";
import Login from "./resources/modal/Login";
import OrderPage from "./resources/page/order/Order";
import Payment from "./resources/page/order/Payment";
import Header from "./resources/components/Header";
import Footer from "./resources/components/Footer";
import ProdList from "./resources/page/product/ProdList";
import SignUp from "./resources/page/SignUp";
import UserUpdate from "./resources/page/BuyerMyPage/UserUpdate";
import { useState } from "react";

function App() {

	// 로그인창 띄울떄 필요한 매개변수
	const [showLogin, setShowLogin] = useState(false);
	const [login, setLogin] = useState(JSON.parse(sessionStorage.getItem("loginMember")+""));

	return (
		<div className="App">
			<Header setShowLogin={setShowLogin} />
			<div className="leftsidebar">
				<Leftmenubar />
			</div>
			<Routes>
				{/* 메인 페이지 */}
				<Route path="/" element={<Mainpage />} />

				{/* 회원 관련 */}
				<Route path="/member">
					{/* 회원가입 페이지 */}
					<Route path="signUp" element={<SignUp />} />
					<Route path="userupdate" element={<UserUpdate />} />
				</Route>

				{/* 제품 관련 */}
				<Route path="/product">
					<Route path="list" element={<ProdList />} />
				</Route>

				{/* ? */}
				<Route path="/order" element={<OrderPage />} />
				{/* <Route path="/leftbar" element={<Leftmenubar />} /> */}
				{/* ? */}
				<Route path="/buyer/mypage/" element={<BuyerMyPage />} />

				{/* ? */}
				<Route path="/Payment" element={<Payment />} />

				{/* ? */}
				<Route path="/cart/CartList/" element={<CartList />} />

				{/* 그 외의 에러 페이지 */}
				<Route path="*" element={
					<h1>404! 아마도 당신은 에러일 겁니다 404!</h1>
				} />
			</Routes>

            {/* 로그인 페이지 */}
            <Login showLogin={showLogin} setShowLogin={setShowLogin} setLogin={setLogin} />

			<Footer />
		</div>
	);
}

export default App;
