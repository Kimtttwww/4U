import "react-router-dom"
import { Route, Routes } from "react-router-dom";
import Login from "./resources/page/Login";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" />
				<Route path="/member">
					<Route path="login/*" element={<Login />} />


				</Route>
				<Route path="*" element={
					<h1>아마도 당신은 에러일 겁니다</h1>
				} />
			</Routes>
		</div>
	);
}

export default App;
