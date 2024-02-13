import "react-router-dom"
import { Link, Route, Routes } from "react-router-dom";
import Login from "./resources/page/Login";
import OrderPage from "./resources/page/order/OrderPage";
import Mainpage from "./resources/page/mainpage";
import SignUp from "./resources/page/signUp";


function App() {
	return (
		<div className="App">
			<Mainpage/>
			<Routes>
				<Route path="/" />
				<Route path="/orderPage" element={<OrderPage />} />
				<Route path="/member" />
					<Route path="login/*" element={<Login />} />
					<Route path="signUp" element={<SignUp />} />

				<Route path="*" element={
					<h1>아마도 당신은 에러일 겁니다</h1>
				} />
			</Routes>
		</div>
	);
}

export default App;
