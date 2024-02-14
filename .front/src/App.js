import "react-router-dom"
import { Route, Routes } from "react-router-dom";
import BuyerMyPage from "./resources/page/BuyerMyPage";
import Login from "./resources/page/Login";
import OrderPage from "./resources/page/order/OrderPage";
import Payment from "./resources/page/order/Payment";
import Mainpage from "./resources/page/Mainpage";
import SignUp from "./resources/page/SignUp";
import Topbar from "../src/resources/page/Topbar";
import Footer from "../src/resources/page/Footer";

function App() {
	return (
		<div className="App">
			<Topbar />
			<Routes>
				<Route path="/" element={<Mainpage />} />
				<Route path="/member">
					<Route path="login/*" element={<Login />} />
					<Route path="signUp" element={<SignUp />} />
				</Route>
				<Route path="/order" element={<OrderPage />} />
				<Route path="/Payment" element={<Payment />} />
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
