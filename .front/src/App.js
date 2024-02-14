import { Route, Routes } from "react-router-dom";
import BuyerMyPage from "./resources/page/BuyerMyPage/BuyerMyPage";
import OrderPage from "./resources/page/order/Order";
import Payment from "./resources/page/order/Payment";
import Mainpage from "./resources/page/Mainpage";
import SignUp from "./resources/page/SignUp";
import Header from "./resources/page/Header";
import Footer from "./resources/page/Footer";
import UserUpdate from "./resources/page/BuyerMyPage/UserUpdate";
import CartList from "./resources/page/BuyerMyPage/cart/CartList";
import ProdList from "./resources/page/product/ProdList";

function App() {

	return (
		<div className="App">
			<Header />
			
			<Routes>
				{/* 메인 페이지 */}
				<Route path="/" element={<Mainpage />} />

				{/* 회원 관련 */}
				<Route path="/member">
					{/* 회원가입 페이지 */}
					<Route path="signUp" element={<SignUp />} />
					<Route path="userupdate" element={<UserUpdate/>} />
				</Route>

				{/* 제품 관련 */}
				<Route path="/product">
					<Route path="list" element={<ProdList />} />
				</Route>

				{/* ? */}
				<Route path="/order" element={<OrderPage />} />

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

			<Footer />
		</div>
	);
}

export default App;
