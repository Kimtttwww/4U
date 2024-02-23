import { Link, Route, Routes } from "react-router-dom";
import BuyerMyPage from "./resources/page/BuyerMyPage/BuyerMyPage";
import CartList from "./resources/page/BuyerMyPage/cart/CartList";
import Login from "./resources/modal/Login";
import Order from "./resources/page/order/Order";
import Payment from "./resources/page/order/Payment";
import Header from "./resources/components/Header";
import Footer from "./resources/components/Footer";
import ProdList from "./resources/page/product/ProdList";
import SignUp from "./resources/page/member/SignUp";
import UserUpdate from "./resources/page/BuyerMyPage/UserUpdate";
import { useState } from "react";
import OrderHt from "./resources/page/BuyerMyPage/orderHistory/OrderHt";
import Error from "./resources/components/Error";
import Leftmenubar from "./resources/components/Leftmenubar";
import Mainpage from "./resources/page/common/Mainpage";
import SellerMyPage from "./resources/page/sellerMyPage/SellerMyPage";
import SellerOrderList from "./resources/page/sellerMyPage/SellerOrderList";
import SellerManagement from "./resources/page/sellerMyPage/SellerManagement";
import SellerReview from "./resources/page/sellerMyPage/SellerReview";
import newQna from "./resources/page/qna/newQna";
import detailQna from "./resources/page/qna/detailQna";
import listqna from "./resources/page/qna/listQna";

function App() {

   /** 로그인창 띄울떄 필요한 매개변수 */
   const [showLogin, setShowLogin] = useState(false);
   const [login, setLogin] = useState(JSON.parse(sessionStorage.getItem("loginMember") + ""));

   return (
      <div className="App">

         <Header setShowLogin={setShowLogin} login={login} setLogin={setLogin} />
         <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<Mainpage />} />

            {/* 회원 관련 */}
            <Route path="/member">
               {/* 회원가입 페이지 */}
               <Route path="signUp" element={<SignUp />} />
               {/* ? */}
               <Route path="userupdate" element={<UserUpdate />} />
            </Route>

            {/* 제품 관련 */}
            <Route path="/product">
               {/* 제품 리스트 */}
               <Route path="list" element={<ProdList />} />
            </Route>
            
            {/* ? */}
            <Route path="/order">
               {/* ? */}
               <Route path="" element={<Order loginUser={login} />} />
               {/* ? */}
               <Route path="payment" element={<Payment />} />
               {/* ? */}
               <Route path="history" element={<OrderHt />} />
            </Route>

            {/* 구매자 마이페이지 */}
            <Route path="/buyer/mypage/" element={<BuyerMyPage />} />

            {/* 장바구니 관련 */}
            <Route path="/cart/CartList/" element={<CartList />} />

            {/* 판매자 마이페이지 */}
            <Route path="/sellerMypage" element={<SellerMyPage />}>
               {/* 주문 확인 */}
               <Route path="list" element={<SellerOrderList />} />
               {/* 상품 관리 */}
               <Route path="management" element={<SellerManagement />} />
               {/* 리뷰 관리 */}
               <Route path="review" element={<SellerReview />} />
            </Route>

            {/* QNA */}
            <Route path="/qna">
               {/* ? */}
               <Route path="newqna" element={<newQna/>}/>
               {/* ? */}
               <Route path="detailqna" element={<detailQna/>}/>
               {/* ? */}
               <Route path="listqna" element={<listQna/>}/>
            </Route>

            {/* 그 외의 에러 페이지 */}
            <Route path="*" element={<Error />} />

         </Routes>

         {/* 로그인 페이지 */}
         <Login showLogin={showLogin} setShowLogin={setShowLogin} setLogin={setLogin} />

         <Footer />
      </div>
   );
}

export default App;
