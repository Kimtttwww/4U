import "react-router-dom"
import { Route, Routes } from "react-router-dom";
import BuyerMyPage from "./resources/page/BuyerMyPage";
import Login from "./resources/page/Login";
import OrderPage from "./resources/page/order/OrderPage";
import Mainpage from "./resources/page/mainpage";
import SignUp from "./resources/page/signUp";
import Header from "./resources/page/Header";
import Footer from "./resources/page/Footer";


function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Mainpage />} />
				<Route path="/member">
					<Route path="login/*" element={<Login />} />
					<Route path="signUp" element={<SignUp />} />
				</Route>
				<Route path="/orderPage" element={<OrderPage />} />
				<Route path="/buyer/mypage/" element={<BuyerMyPage />} /> 
				<Route path="*" element={
					<h1>아마도 당신은 에러일 겁니다</h1>
				} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
