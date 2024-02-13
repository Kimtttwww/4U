import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./resources/page/Login";
import BuyerMyPage from "./resources/page/BuyerMyPage";

function App() {
  return (
	<div className="App">
	<Router>
	  <Routes>
		<Route path="/" />
		
		<Route path="/member/*">
		  <Route path="login" element={<Login />} />
		</Route>

		<Route path="/buyer/mypage/" element={<BuyerMyPage />} /> 

		<Route path="*" element={<h1>아마도 당신은 에러일 겁니다</h1>} />
	  </Routes>
	</Router>
  </div>
  );
}

export default App;
